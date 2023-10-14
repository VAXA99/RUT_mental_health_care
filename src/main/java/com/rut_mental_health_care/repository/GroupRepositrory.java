package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepositrory extends JpaRepository<Group, Long> {
}
