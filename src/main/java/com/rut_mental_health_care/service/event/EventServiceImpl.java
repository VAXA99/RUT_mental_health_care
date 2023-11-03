package com.rut_mental_health_care.service;

import com.rut_mental_health_care.entity.Event;
import com.rut_mental_health_care.entity.EventNotification;
import com.rut_mental_health_care.entity.EventReminder;
import com.rut_mental_health_care.repository.EventNotificationRepository;
import com.rut_mental_health_care.repository.EventReminderRepository;
import com.rut_mental_health_care.repository.EventRepository;
import com.rut_mental_health_care.service.event.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final EventNotificationRepository eventNotificationRepository;
    private final EventReminderRepository eventReminderRepository;

    @Autowired
    public EventServiceImpl(
            EventRepository eventRepository,
            EventNotificationRepository eventNotificationRepository,
            EventReminderRepository eventReminderRepository
    ) {
        this.eventRepository = eventRepository;
        this.eventNotificationRepository = eventNotificationRepository;
        this.eventReminderRepository = eventReminderRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long eventId) {
        return eventRepository.findById(eventId);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long eventId, Event updatedEvent) {
        Optional<Event> existingEvent = eventRepository.findById(eventId);

        if (existingEvent.isPresent()) {
            updatedEvent.setId(existingEvent.get().getId());
            return eventRepository.save(updatedEvent);
        } else {
            // Handle error or throw an exception if the event doesn't exist.
            // You can decide the appropriate behavior here.
            return null;
        }
    }

    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    public EventNotification createEventNotificationAndResend(EventReminder eventReminder) {
        Optional<Event> event = eventReminder.getEventNotification().getEvent();
        if (event.isPresent()) {
            // Create a new EventNotification
            EventNotification eventNotification = new EventNotification();
            eventNotification.setEvent(event.get());
            eventNotification.setUser(eventReminder.getUser());
            eventNotification.setRead(false);
            eventNotification.setTrash(false);
            eventNotification.setDescription("New Event Notification");

            // Save the new EventNotification
            eventNotification = eventNotificationRepository.save(eventNotification);

            // Update the reminderCount and reminder_interval
            int newReminderCount = eventReminder.getReminderCount() - 1;
            eventReminder.setReminderCount(newReminderCount);

            if (newReminderCount > 0) {
                LocalDateTime now = LocalDateTime.now();
                LocalDateTime newReminderTime = now.plusMinutes(eventReminder.getReminder_interval());
                eventReminder.setReminder_interval(newReminderTime);
            } else {
                // If reminderCount is zero, no more reminders are needed.
                // You can choose to delete the EventReminder or mark it as completed, depending on your design.
            }

            // Save the updated EventReminder
            eventReminderRepository.save(eventReminder);

            // Send the notification (e.g., through email, push notification, etc.)

            return eventNotification;
        } else {
            // Handle error or throw an exception if the associated event doesn't exist.
            return null;
        }
    }
}
