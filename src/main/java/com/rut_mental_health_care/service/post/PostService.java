package com.rut_mental_health_care.service.post;

import com.rut_mental_health_care.dto.CommentDto;
import com.rut_mental_health_care.dto.PostDto;

import java.util.List;
public interface PostService {

    List<PostDto> getFeed();
    List<CommentDto> getComments(Long postId);
    void likePost(Long postId, String username, Boolean isLike);
    void commentPost(Long postId, CommentDto commentDto);
    void writePost(PostDto postDto);
    void editPost(Long postId, String newContent);
    void deletePost(Long postId);
}
