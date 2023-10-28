package com.rut_mental_health_care.service.comment;

import com.rut_mental_health_care.entity.Comment;
import com.rut_mental_health_care.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface CommentService {

    void writeComment(Comment comment);

    void likeComment(Comment comment, User user);

    void dislikeComment(Comment comment, User user);

    void replyToComment(Comment comment, Comment newComment);

}
