package com.rut_mental_health_care.service.communication;

import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.model.Tag;

import java.util.List;
public interface CommunicationService {

    List<PostDto> getFeed(Long scrollingUserId, String feedType, List<String> tagNames);
    List<Tag> getAllAvailableTags();
    PostDto getPostWithComments(Long scrollingUserId, Long postId);
    List<PostDto> getUserPosts(Long userId);
    void likePost(Long postId, Long userId, Boolean isLike);
    Long commentPost(Long postId, Long userId, String content);
    void replyToComment(Long parentCommentId, Long userId, String content);
    void editComment(Long commentId, String newContent);
    void deleteComment(Long commentId);
    void writePost(Long userId, String title, String content, List<String> tagNames);
    void editPost(Long postId, String newTitle, String newContent, List<String> tagNames);
    void deletePost(Long postId);
}
