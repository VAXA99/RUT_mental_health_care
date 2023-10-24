package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.entity.EventReminder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventReminderRepository extends JpaRepository<EventReminder, Long> {
}
