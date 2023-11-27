    package com.rut_mental_health_care.model;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    @Entity
    @Table(name = "likes")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Like {
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

        @ManyToOne
        @JoinColumn(name = "post_id", nullable = false)
        private Post post;

        private Boolean isLike;

        @PostPersist
        public void onLikePersist() {
            CommunicationNotification notification = new CommunicationNotification();
            notification.setSender(this.user);
            notification.setRecipient(this.post.getUser());
            notification.setPost(this.post);
            notification.setMessage("Пользователю " + this.user.getUsername() + " понравился ваш пост");
            // notificationService.sendNotification(notification);

        }
    }
