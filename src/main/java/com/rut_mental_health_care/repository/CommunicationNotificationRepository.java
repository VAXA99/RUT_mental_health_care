package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.model.CommunicationNotification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunicationNotificationRepository extends JpaRepository<CommunicationNotification, Long> {
}
