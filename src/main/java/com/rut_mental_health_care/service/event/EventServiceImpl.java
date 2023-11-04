package com.rut_mental_health_care.service.event;

import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.entity.Event;
import com.rut_mental_health_care.entity.EventNotification;
import com.rut_mental_health_care.entity.EventReminder;
import com.rut_mental_health_care.entity.User;
import com.rut_mental_health_care.repository.EventNotificationRepository;
import com.rut_mental_health_care.repository.EventReminderRepository;
import com.rut_mental_health_care.repository.EventRepository;
import com.rut_mental_health_care.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final EventNotificationRepository eventNotificationRepository;
    private final EventReminderRepository eventReminderRepository;
    private final UserRepository userRepository;

    @Autowired
    public EventServiceImpl(
            EventRepository eventRepository,
            EventNotificationRepository eventNotificationRepository,
            EventReminderRepository eventReminderRepository,
            UserRepository userRepository
    ) {
        this.eventRepository = eventRepository;
        this.eventNotificationRepository = eventNotificationRepository;
        this.eventReminderRepository = eventReminderRepository;
        this.userRepository = userRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with ID: " + eventId));
    }

    public void createEvent(Event event) {
        eventRepository.save(event);
        createEventNotification(event);
    }

    public void updateEvent(Long eventId, Event updatedEvent) {
        Event existingEvent = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with ID: " + eventId));

        updatedEvent.setId(existingEvent.getId());
        eventRepository.save(updatedEvent);
    }

    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    public






    //todo rethink and maybe use Dtos
    private EventNotification createEventNotification(Event event) {


        EventNotification eventNotification = new EventNotification();
        eventNotification.setEvent(event);
        eventNotification.setUser(user);

        // Set other properties as needed
        eventNotificationRepository.save(eventNotification);
        return eventNotification;
    }

}
