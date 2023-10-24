package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
