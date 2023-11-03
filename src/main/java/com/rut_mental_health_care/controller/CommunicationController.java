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

    @GetMapping("/{postId}/comments")
    public List<CommentDto> getComments(@PathVariable Long postId) {
        return communicationService.getComments(postId);
    }

    @PostMapping("/{postId}/like")
    public void likePost(@PathVariable Long postId, @RequestParam Boolean isLike) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        communicationService.likePost(postId, username, isLike);
    }
    @PostMapping("/write")
    public void writePost(@RequestBody PostDto postDTO) {
        communicationService.writePost(postDTO);
    }

    @PostMapping("/{postId}/comment")
    public void commentPost(@PathVariable Long postId, @RequestBody CommentDto commentDto) {
        communicationService.commentPost(postId, commentDto);
    }

    @PostMapping("/{commentId}/reply")
    public void replyToComment(@PathVariable Long commentId, @RequestBody CommentDto replyDto) {
        communicationService.replyToComment(commentId, replyDto);
    }

    @PutMapping("/{commentId}/edit")
    public void editComment(@PathVariable Long commentId, @RequestParam String newContent) {
        communicationService.editComment(commentId, newContent);
    }

    @DeleteMapping("/{commentId}/delete")
    public void deleteComment(@PathVariable Long commentId) {
        communicationService.deleteComment(commentId);
    }

    @PutMapping("/{postId}/edit")
    public void editPost(@PathVariable Long postId, @RequestParam String newContent) {
        communicationService.editPost(postId, newContent);
    }

    @DeleteMapping("/{postId}/delete")
    public void deletePost(@PathVariable Long postId) {
        communicationService.deletePost(postId);
    }


}
