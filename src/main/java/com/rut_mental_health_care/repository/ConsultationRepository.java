package com.rut_mental_health_care.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rut_mental_health_care.entity.Consultation;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {

    @Query("SELECT c FROM Consultation c " +
            "WHERE (c.startsAt = :oneDayBefore OR c.startsAt = :twoHoursBefore)")
    List<Consultation> findConsultationsToRemind(
            @Param("oneDayBefore") LocalDateTime oneDayBefore,
            @Param("twoHoursBefore") LocalDateTime twoHoursBefore
    );
    List<Consultation> findAllByPsychologistId(Long psychologistId);
    List<Consultation> findAllByPatientId(Long userId);

}
