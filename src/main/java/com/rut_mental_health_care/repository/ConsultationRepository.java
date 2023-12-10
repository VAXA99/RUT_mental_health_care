package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.model.Consultation;
import com.rut_mental_health_care.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findAllByPsychologistId(Long psychologistId);

    List<Consultation> findAllByPatientId(Long userId);

    @Query("SELECT c FROM Consultation c " +
            "WHERE c.patient.id = :userId " +
            "AND c.endsAt > :currentDateTime")
    List<Consultation> hasActiveConsultationSetUp(@Param("userId") Long userId,
                                                  @Param("currentDateTime") LocalDateTime currentDateTime);

    @Query("SELECT cons FROM Consultation cons " +
            "WHERE cons.startsAt >= :startDate " +
            "AND cons.endsAt < :nextDay " +
            "AND cons.available = true " +
            "AND cons.psychologist = :psychologist")
    List<Consultation> findAllAvailableConsultationsForDate(@Param("startDate") LocalDateTime startDate,
                                                            @Param("nextDay") LocalDateTime nextDay,
                                                            @Param("psychologist") User psychologist);

    List<Consultation> findAllByAvailableAndStartsAtBetweenAndPsychologistId(boolean available, LocalDateTime startOfMonth, LocalDateTime endOfMonth, Long psychologistId);
}
