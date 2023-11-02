package com.rut_mental_health_care.service.comment;

import com.rut_mental_health_care.dto.CommentDto;

public interface CommentService {

    void writeComment(CommentDto commentDto, Long postId);

    void replyToComment(Long parentCommentId, CommentDto replyDto);

    void editComment(Long commentId, String newContent);

    void deleteComment(Long commentId);
}
