package com.rut_mental_health_care.service.comment;


import com.rut_mental_health_care.entity.Comment;
import com.rut_mental_health_care.entity.Post;
import com.rut_mental_health_care.entity.User;
import com.rut_mental_health_care.repository.CommentRepository;
import com.rut_mental_health_care.repository.LikeRepository;
import com.rut_mental_health_care.repository.PostRepository;
import com.rut_mental_health_care.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void writeComment(Comment comment) {

    }

    @Override
    public void likeComment(Comment comment, User user) {

    }

    @Override
    public void dislikeComment(Comment comment, User user) {

    }

    @Override
    public void replyToComment(Comment comment, Comment newComment) {

    }
}
