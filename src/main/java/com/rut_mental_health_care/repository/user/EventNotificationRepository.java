package com.rut_mental_health_care.repository.user;

import com.rut_mental_health_care.entity.EventNotification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventNotificationRepository extends JpaRepository<EventNotification, Long> {
}
