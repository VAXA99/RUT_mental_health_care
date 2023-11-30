package com.rut_mental_health_care.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rut_mental_health_care.model.Consultation;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findAllByPsychologistId(Long psychologistId);
    List<Consultation> findAllByPatientId(Long userId);
    @Query("SELECT c FROM Consultation c " +
            "WHERE c.startsAt >= :startDate " +
            "AND c.endsAt < :nextDay " +
            "AND c.isAvailable = true")
    List<Consultation> findAllAvailableConsultationsForDate(@Param("startDate") LocalDateTime startDate,
                                                            @Param("nextDay") LocalDateTime nextDay);

}
