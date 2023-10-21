package com.rut_mental_health_care.entity;

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
    private User user;

    @ManyToOne
    private Post post;

    @ManyToOne
    private Comment parrentComment;

    @Column(nullable = false)
    private String content;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
