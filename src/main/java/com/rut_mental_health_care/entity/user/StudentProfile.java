package com.rut_mental_health_care.entity.user;

import com.rut_mental_health_care.entity.Department;
import com.rut_mental_health_care.entity.Group;
import com.rut_mental_health_care.entity.Institute;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Institute institute;
    @ManyToOne
    private Group group;
    @ManyToOne
    private Department department;
}
