package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.model.PsychProblem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PsychProblemRepository extends JpaRepository<PsychProblem, Long> {

    Optional<PsychProblem> findByDescription(String description);


    @Query(nativeQuery = true, value = "SELECT p.description " +
            "FROM psychproblem p " +
            "JOIN consultation_psychproblem cp ON p.id = cp.psychproblem_id " +
            "WHERE cp.post_id = :consultationId")
    List<String> findPsychProblemByConsultationId(@Param("consultationId") Long consultationId);


}
