package com.rut_mental_health_care.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne(cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Boolean isEdited;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PostPersist
    public void onCommentPersist() {
        CommunicationNotification notification = new CommunicationNotification();
        notification.setSender(this.user);
        notification.setRecipient(this.post.getUser());
        notification.setPost(this.post);
        notification.setMessage("Пользователь " + this.user.getUsername() + " оставил комментариий под вашим постом");
        // notificationService.sendNotification(notification);

    }
}
