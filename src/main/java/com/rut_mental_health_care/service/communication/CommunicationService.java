package com.rut_mental_health_care.service.communication;

import com.rut_mental_health_care.dto.CommentDto;
import com.rut_mental_health_care.dto.PostDto;

import java.util.List;
public interface CommunicationService {

    List<PostDto> getFeed(Long scrollingUserId);
    List<PostDto> getPostsFromMostPopularToLeast(Long scrollingUserId);
    PostDto getPostWithComments(Long postId);
    void likePost(Long postId, Long userId, Boolean isLike);
    void commentPost(Long postId, Long userId, String content);
    void replyToComment(Long parentCommentId, Long userId, String content);
    void editComment(Long commentId, String newContent);
    void deleteComment(Long commentId);
    void writePost(Long userId, String title, String content, List<String> tagNames);
    void editPost(Long postId, String newContent);
    void deletePost(Long postId);
}
