package com.rut_mental_health_care.entity;

import com.rut_mental_health_care.entity.user.User;
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

    private String content;

    @ManyToOne
    private Thread thread;

    @ManyToOne
    private User author;

    @ManyToOne
    private Comment parrentComment;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime timestamp;
}
