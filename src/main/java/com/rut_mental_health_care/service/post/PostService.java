package com.rut_mental_health_care.service.post;

import com.rut_mental_health_care.entity.Comment;
import com.rut_mental_health_care.entity.Post;

import java.util.List;
public interface PostService {

    void writePost(Post post);

    List<Post> getFeed();

    List<Comment> getComments(Long postId);

    void likePost(Long postId, String username, Boolean isLike);

    void commentPost(Long postId, Comment comment);

}
