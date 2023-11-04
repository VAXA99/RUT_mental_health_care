package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findEventsByEventStartsAtBetween(LocalDateTime startTime, LocalDateTime endTime);
}
