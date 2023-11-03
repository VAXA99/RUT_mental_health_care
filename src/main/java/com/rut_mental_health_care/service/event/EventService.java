package com.rut_mental_health_care.service.event;

import com.rut_mental_health_care.entity.Event;
import com.rut_mental_health_care.entity.EventNotification;

import java.util.List;

public interface EventService {
    List<EventNotification> seeAllNotifications();
    EventNotification createEventNotification(Event event);
    EventNotification remindAboutEvent();


}
