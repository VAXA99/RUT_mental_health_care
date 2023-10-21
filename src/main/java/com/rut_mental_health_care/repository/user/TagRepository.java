package com.rut_mental_health_care.repository.user;

import com.rut_mental_health_care.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
