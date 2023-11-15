package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.dto.CommentDto;
import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.service.communication.CommunicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class CommunicationController {

    private final CommunicationService communicationService;

    @Autowired
    public CommunicationController(CommunicationService communicationService) {
        this.communicationService = communicationService;
    }

    @GetMapping("/feed")
    public List<PostDto> getFeed() {
        return communicationService.getFeed();
    }

    @GetMapping("/post/{postId}")
    public PostDto getPostById(@PathVariable Long postId) {
        return communicationService.getPostWithComments(postId);
    }

    @PostMapping("/like/{postId}")
    public void likePost(@PathVariable Long postId, @RequestParam Boolean isLike) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        communicationService.likePost(postId, username, isLike);
    }
    @PostMapping("/write")
    public void writePost(@RequestBody PostDto postDTO) {
        communicationService.writePost(postDTO);
    }

    @PostMapping("/comment/{postId}")
    public void commentPost(@PathVariable Long postId, @RequestBody CommentDto commentDto) {
        communicationService.commentPost(postId, commentDto);
    }

    @PostMapping("/reply/{commentId}")
    public void replyToComment(@PathVariable Long commentId, @RequestBody CommentDto replyDto) {
        communicationService.replyToComment(commentId, replyDto);
    }

    @PutMapping("/edit/{commentId}")
    public void editComment(@PathVariable Long commentId, @RequestParam String newContent) {
        communicationService.editComment(commentId, newContent);
    }

    @DeleteMapping("/delete/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        communicationService.deleteComment(commentId);
    }

    @PutMapping("/edit/{postId}")
    public void editPost(@PathVariable Long postId, @RequestParam String newContent) {
        communicationService.editPost(postId, newContent);
    }

    @DeleteMapping("/delete/{postId}")
    public void deletePost(@PathVariable Long postId) {
        communicationService.deletePost(postId);
    }


}
