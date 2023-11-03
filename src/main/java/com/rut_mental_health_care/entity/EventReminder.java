package com.rut_mental_health_care.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventReminder {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_notification_id", nullable = false)
    private EventNotification eventNotification;

    @Column(nullable = false)
    private Integer reminderCount;

    @Column(nullable = false)
    private Integer reminder_interval;

}
