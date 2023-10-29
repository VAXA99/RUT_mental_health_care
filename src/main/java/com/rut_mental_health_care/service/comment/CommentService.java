package com.rut_mental_health_care.service.comment;

import com.rut_mental_health_care.entity.Comment;

public interface CommentService {

    void writeComment(Comment comment, Long postId);

    void replyToComment(Comment comment, Comment reply);

    void editComment(Comment comment, String newContent);

    void deleteComment(Comment comment);
}
