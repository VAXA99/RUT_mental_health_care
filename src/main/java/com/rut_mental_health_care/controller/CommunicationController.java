package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.dto.CommentDto;
import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.service.communication.CommunicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin("http://localhost:3000/")
public class CommunicationController {

    private final CommunicationService communicationService;

    @Autowired
    public CommunicationController(CommunicationService communicationService) {
        this.communicationService = communicationService;
    }

    @GetMapping("/feed")
    public ResponseEntity<List<PostDto>> getFeed() {
        try {
            List<PostDto> feed = communicationService.getFeed();
            return ResponseEntity.ok(feed);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long postId) {
        try {
            PostDto post = communicationService.getPostWithComments(postId);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/like/{postId}")
    public ResponseEntity<String> likePost(@PathVariable Long postId, @RequestParam Long userId, @RequestParam Boolean isLike) {
        try {
            communicationService.likePost(postId, userId, isLike);
            return ResponseEntity.ok("Post liked successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error liking post");
        }
    }

    @PostMapping("/write")
    public ResponseEntity<String> writePost(@RequestBody PostDto postDTO) {
        try {
            communicationService.writePost(postDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Post created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating post");
        }
    }

    @PostMapping("/comment/{postId}")
    public ResponseEntity<String> commentPost(@PathVariable Long postId, @RequestBody CommentDto commentDto) {
        try {
            communicationService.commentPost(postId, commentDto);
            return ResponseEntity.ok("Comment added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding comment");
        }
    }

    @PostMapping("/reply/{commentId}")
    public ResponseEntity<String> replyToComment(@PathVariable Long commentId, @RequestBody CommentDto replyDto) {
        try {
            communicationService.replyToComment(commentId, replyDto);
            return ResponseEntity.ok("Reply added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding reply");
        }
    }

    @PutMapping("/edit/comment/{commentId}")
    public ResponseEntity<String> editComment(@PathVariable Long commentId, @RequestParam String newContent) {
        try {
            communicationService.editComment(commentId, newContent);
            return ResponseEntity.ok("Comment edited successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error editing comment");
        }
    }

    @DeleteMapping("/delete/comment/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
        try {
            communicationService.deleteComment(commentId);
            return ResponseEntity.ok("Comment deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting comment");
        }
    }

    @PutMapping("/edit/post/{postId}")
    public ResponseEntity<String> editPost(@PathVariable Long postId, @RequestParam String newContent) {
        try {
            communicationService.editPost(postId, newContent);
            return ResponseEntity.ok("Post edited successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error editing post");
        }
    }

    @DeleteMapping("/delete/post/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId) {
        try {
            communicationService.deletePost(postId);
            return ResponseEntity.ok("Post deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting post");
        }
    }


}
