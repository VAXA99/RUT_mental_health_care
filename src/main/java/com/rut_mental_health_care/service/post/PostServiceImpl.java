package com.rut_mental_health_care.service.post;

import com.rut_mental_health_care.entity.Comment;
import com.rut_mental_health_care.entity.Like;
import com.rut_mental_health_care.entity.Post;
import com.rut_mental_health_care.entity.User;
import com.rut_mental_health_care.repository.CommentRepository;
import com.rut_mental_health_care.repository.LikeRepository;
import com.rut_mental_health_care.repository.PostRepository;
import com.rut_mental_health_care.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;

    private CommentRepository commentRepository;

    private LikeRepository likeRepository;

    private UserRepository userRepository;

    @Autowired
    public void setPostRepository(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Autowired
    public void setCommentRepository(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Autowired
    public void setLikeRepository(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<Post> getFeed() {
        return postRepository.findAll();
    }

    @Override
    public List<Comment> getComments(Long postId) {
        return commentRepository.findCommentByPostId(postId);
    }

    @Override
    @Async
    public void likePost(Long postId, String username, Boolean isLike) {
        Like existingLike = likeRepository.findByPostIdAndUserUsername(postId, username);
        if (existingLike != null) {
            likeRepository.delete(existingLike);
        }
        Like like = new Like();
        Post post = postRepository.findById(postId).orElse(null); // TODO rework with handling exception
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
        like.setUser(user);
        like.setPost(post);
        like.setIsLike(isLike);

        likeRepository.save(like);
    }

    @Override
    @Async
    public void commentPost(Long postId, Comment comment) {
        Post post =  postRepository.findById(postId).orElse(null);
        comment.setPost(post);
        commentRepository.save(comment);
    }

    @Override
    @Async
    public void writePost(Post post) {
        postRepository.save(post);
    }

    @Override
    @Async
    public void editPost(Post post, String newContent) {
        post.setContent(newContent);
        post.setIsEdited(true);
        postRepository.save(post);
    }

    @Override
    @Async
    public void deletePost(Post post) {
        postRepository.delete(post);
    }
}
