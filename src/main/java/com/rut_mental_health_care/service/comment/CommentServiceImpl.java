package com.rut_mental_health_care.service.comment;


import com.rut_mental_health_care.entity.Comment;
import com.rut_mental_health_care.entity.Post;
import com.rut_mental_health_care.entity.User;
import com.rut_mental_health_care.repository.CommentRepository;
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

    @Autowired
    public void setPostRepository(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Autowired
    public void setCommentRepository(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
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
        reply.setParentComment(comment);
        commentRepository.save(reply);
    }

    @Override
    @Async
    public void editComment(Comment comment, String newContent) {
        comment.setContent(newContent);
        comment.setIsEdited(true);
        commentRepository.save(comment);
    }

    @Override
    @Async
    public void deleteComment(Comment comment) {
        commentRepository.delete(comment);
    }
}
