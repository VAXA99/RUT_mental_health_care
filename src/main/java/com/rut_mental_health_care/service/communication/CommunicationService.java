package com.rut_mental_health_care.service.communication;

import com.rut_mental_health_care.dto.CommentDto;
import com.rut_mental_health_care.dto.PostDto;

import java.util.List;
public interface CommunicationService {

    List<PostDto> getFeed();
    PostDto getPostWithComments(Long postId);
    void likePost(Long postId, Long userId, Boolean isLike);
    void commentPost(Long postId, CommentDto commentDto);
    void replyToComment(Long parentCommentId, CommentDto replyDto);
    void editComment(Long commentId, String newContent);
    void deleteComment(Long commentId);
    void writePost(PostDto postDto);
    void editPost(Long postId, String newContent);
    void deletePost(Long postId);
}
