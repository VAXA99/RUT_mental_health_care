package com.rut_mental_health_care.service.comment;

import com.rut_mental_health_care.entity.Comment;
import com.rut_mental_health_care.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface CommentService {

    void writeComment(Comment comment, Long postId);

    void replyToComment(Comment comment, Comment reply);

}
