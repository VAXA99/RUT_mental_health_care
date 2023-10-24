package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.entity.Post;
import com.rut_mental_health_care.service.post.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {
    private PostService postService;
    @Autowired
    public void setPostService(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/write_post")
    private ResponseEntity<?> writePost(Post post) {
        postService.writePost(post);
        return ResponseEntity.ok("Posted successfully");
    }

}
