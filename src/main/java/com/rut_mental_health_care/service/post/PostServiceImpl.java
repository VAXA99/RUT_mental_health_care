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
    public List<Comment> getComments(Post post) {
        return commentRepository.findCommentByPost(post);
    }

    @Override
    @Async
    public void likePost(Post post, User user) {
        Like existingLike = likeRepository.findByPostAndUser(post, user);
        if (hasUserLikedPost(post, user)) {
            likeRepository.delete(existingLike);
        }

        Like like = new Like();
        like.setUser(user);
        like.setPost(post);
        like.setIsLike(true);

        likeRepository.save(like);
    }

    private boolean hasUserLikedPost(Post post, User user) {
        return likeRepository.existsByPostAndUser(post, user);
    }

    @Override
    @Async
    public void dislikePost(Post post, User user) {
        Like existingLike = likeRepository.findByPostAndUser(post, user);
        if (hasUserLikedPost(post, user)) {
            likeRepository.delete(existingLike);
        }

        Like like = new Like();
        like.setUser(user);
        like.setPost(post);
        like.setIsLike(false);

        likeRepository.save(like);
    }

    @Override
    @Async
    public void commentPost(Post post, Comment comment) {
        comment.setPost(post);
        commentRepository.save(comment);
    }

    @Override
    @Async
    public void writePost(Post post) {
        postRepository.save(post);
    }
}
