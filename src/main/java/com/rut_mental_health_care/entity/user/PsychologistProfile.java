package com.rut_mental_health_care.entity.user;

import com.rut_mental_health_care.entity.Qualification;
import com.rut_mental_health_care.entity.Specialization;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PsychologistProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Qualification qualification;
    @ManyToOne
    private Specialization specialization;
}

