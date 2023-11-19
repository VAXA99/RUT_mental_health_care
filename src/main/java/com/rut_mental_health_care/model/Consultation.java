package com.rut_mental_health_care.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User patient;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User psychologist;

    @Column(nullable = false)
    private LocalDateTime startsAt;

    @Column(nullable = false)
    private LocalDateTime endsAt;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Location location;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "consultation_psychproblems",
            joinColumns = @JoinColumn(name = "consultation_id"),
            inverseJoinColumns = @JoinColumn(name = "psychproblem_id"))
    private List<PsychProblem> psychProblems;
}
