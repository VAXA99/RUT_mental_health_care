package com.rut_mental_health_care.service.post;

import com.rut_mental_health_care.entity.Comment;
import com.rut_mental_health_care.entity.Post;
import com.rut_mental_health_care.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface PostService {

    void writePost(Post post);

    List<Post> getFeed();

    List<Comment> getComments(Post post);

    void likePost(Post post, User user);

    void dislikePost(Post post, User user);

    void commentPost(Post post, Comment comment);

}
