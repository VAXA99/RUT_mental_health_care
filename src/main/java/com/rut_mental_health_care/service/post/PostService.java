package com.rut_mental_health_care.service.post;

import com.rut_mental_health_care.entity.Comment;
import com.rut_mental_health_care.entity.Post;

import java.util.List;

public interface PostService {
    List<Post> getFeed();

    List<Comment> getComments(Long postId);

    void likePost(Post post, Long userId);

    void dislikePost(Post post, Long userId);

    void commentPost(Post post, Comment comment);

}
