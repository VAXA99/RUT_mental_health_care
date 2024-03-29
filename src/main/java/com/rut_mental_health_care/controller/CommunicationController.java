package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.controller.request.CommentRequest;
import com.rut_mental_health_care.controller.request.FeedRequest;
import com.rut_mental_health_care.controller.request.PostRequest;
import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.model.Tag;
import com.rut_mental_health_care.service.communication.CommunicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PostMapping("/feed")
    public ResponseEntity<?> getFeed(@RequestBody FeedRequest feedRequest) {
        try {
            List<PostDto> feed = communicationService.getFeed(feedRequest.getScrollingUserId(),
                    feedRequest.getFeedType(),
                    feedRequest.getTagNames());
            return ResponseEntity.ok(feed);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while fetching the feed.");

        }
    }

    @GetMapping("/allAvailableTags")
    public ResponseEntity<List<Tag>> getAllAvailableTags() {
        try {
            List<Tag> tags = communicationService.getAllAvailableTags();
            return ResponseEntity.ok(tags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long postId, @RequestParam Long scrollingUserId) {
        try {
            PostDto post = communicationService.getPostWithComments(scrollingUserId, postId);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/userPosts/{userId}")
    public ResponseEntity<List<PostDto>> getUserPosts(@PathVariable Long userId) {
        try {
            List<PostDto> posts = communicationService.getUserPosts(userId);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PostMapping("/like/post/{postId}")
    public ResponseEntity<String> likePost(@PathVariable Long postId, @RequestParam Long userId, @RequestParam Boolean isLike) {
        try {
            communicationService.likePost(postId, userId, isLike);
            return ResponseEntity.ok("Post liked successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error liking post");
        }
    }

    @PostMapping("/write")
    public ResponseEntity<String> writePost(@RequestBody PostRequest postRequest) {
        try {
            communicationService.writePost(postRequest.getUserId(),
                    postRequest.getTitle(),
                    postRequest.getContent(),
                    postRequest.getTagNames());
            return ResponseEntity.status(HttpStatus.CREATED).body("Post created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating post");
        }
    }

    @PostMapping("/comment/post/{postId}")
    public ResponseEntity<?> commentPost(@PathVariable Long postId, @RequestBody CommentRequest commentRequest) {
        try {
            Long commentId = communicationService.commentPost(postId,
                    commentRequest.getUserId(),
                    commentRequest.getContent()
            );
            return ResponseEntity.ok(commentId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding comment");
        }
    }

    @PostMapping("/reply/comment/{commentId}")
    public ResponseEntity<String> replyToComment(@PathVariable Long commentId, @RequestBody CommentRequest commentRequest) {
        try {
            communicationService.replyToComment(commentId,
                    commentRequest.getUserId(),
                    commentRequest.getContent()
            );
            return ResponseEntity.ok("Reply added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding reply");
        }
    }

    @PatchMapping("/edit/comment/{commentId}")
    public ResponseEntity<String> editComment(@PathVariable Long commentId, @RequestBody CommentRequest commentRequest) {
        try {
            communicationService.editComment(commentId,
                    commentRequest.getContent());
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

    @PatchMapping("/edit/post/{postId}")
    public ResponseEntity<String> editPost(@PathVariable Long postId, @RequestBody PostRequest postRequest) {
        try {
            communicationService.editPost(postId,
                    postRequest.getTitle(),
                    postRequest.getContent(),
                    postRequest.getTagNames());
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
