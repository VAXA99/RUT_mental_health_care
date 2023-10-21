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
public class Event {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @ManyToOne
    private EventType eventType;

    @ManyToOne
    private Location eventLocation;

    @Column(nullable = false)
    private LocalDateTime eventStartsAt;

    @Column(nullable = false)
    private LocalDateTime eventEndsAt;
}
