package com.rut_mental_health_care.service.comment;


import com.rut_mental_health_care.entity.Comment;
import com.rut_mental_health_care.entity.Post;
import com.rut_mental_health_care.entity.User;
import com.rut_mental_health_care.repository.CommentRepository;
import com.rut_mental_health_care.repository.LikeRepository;
import com.rut_mental_health_care.repository.PostRepository;
import com.rut_mental_health_care.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;

    private UserRepository userRepository;

    private PostRepository postRepository;

    private LikeRepository likeRepository;

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
    @Async
    public void writeComment(Comment comment, Long postId) {
        Post post = postRepository.findById(postId).orElse(null); // TODO implementation of orElse
        comment.setPost(post);
        commentRepository.save(comment);
    }

    @Override
    @Async
    public void replyToComment(Comment comment, Comment reply) {
        Post post = comment.getPost();
        reply.setPost(post);
        reply.setParrentComment(comment);
    }
}
