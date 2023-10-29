package com.rut_mental_health_care.service.comment;

import com.rut_mental_health_care.entity.Comment;

public interface CommentService {

    void writeComment(Comment comment, Long postId);

    void replyToComment(Long parentCommentId, Comment reply);

    void editComment(Long commentId, String newContent);

    void deleteComment(Long commentId);
}
