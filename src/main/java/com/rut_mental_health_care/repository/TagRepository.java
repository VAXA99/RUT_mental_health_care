package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByDescription(String description);
}
