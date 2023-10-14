package com.rut_mental_health_care.repository.user;

import com.rut_mental_health_care.entity.user.PsychologistProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PsychologistProfileRepository extends JpaRepository<PsychologistProfile, Long> {
}
