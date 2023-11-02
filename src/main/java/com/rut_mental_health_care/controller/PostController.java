package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.dto.CommentDto;
import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.service.post.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/feed")
    public List<PostDto> getFeed() {
        return postService.getFeed();
    }

    @GetMapping("/{postId}/comments")
    public List<CommentDto> getComments(@PathVariable Long postId) {
        return postService.getComments(postId);
    }

    @PostMapping("/{postId}/like")
    public void likePost(@PathVariable Long postId, @RequestParam String username, @RequestParam Boolean isLike) {
        postService.likePost(postId, username, isLike);
    }

    @PostMapping("/{postId}/comment")
    public void commentPost(@PathVariable Long postId, @RequestBody CommentDto commentDto) {
        postService.commentPost(postId, commentDto);
    }

    @PostMapping("/write")
    public void writePost(@RequestBody PostDto postDTO) {
        postService.writePost(postDTO);
    }

    @PutMapping("/{postId}/edit")
    public void editPost(@PathVariable Long postId, @RequestParam String newContent) {
        postService.editPost(postId, newContent);
    }

    @DeleteMapping("/{postId}/delete")
    public void deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
    }
}
