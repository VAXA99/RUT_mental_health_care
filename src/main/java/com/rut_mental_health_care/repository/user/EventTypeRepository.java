package com.rut_mental_health_care.repository.user;

import com.rut_mental_health_care.entity.EventType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventTypeRepository extends JpaRepository<EventType, Long> {
}
