package com.rut_mental_health_care.service.communication;

import com.rut_mental_health_care.dto.CommunicationNotificationDto;

public interface CommunicationNotificationService {
    CommunicationNotificationDto getAllNotifications();
    String sendNotificationOnLike();
    String sendNotificationOnComment();
}
