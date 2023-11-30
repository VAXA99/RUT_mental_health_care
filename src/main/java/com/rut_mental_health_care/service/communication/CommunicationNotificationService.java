package com.rut_mental_health_care.service.communication;

import com.rut_mental_health_care.model.Comment;
import com.rut_mental_health_care.model.CommunicationNotification;
import com.rut_mental_health_care.model.Like;

public interface CommunicationNotificationService {
    void createNotification(Long senderId, Comment comment);
    void createNotification(Long senderId, Like like);
}
