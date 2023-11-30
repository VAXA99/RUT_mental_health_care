package com.rut_mental_health_care.service.communication;

import com.rut_mental_health_care.model.Comment;
import com.rut_mental_health_care.model.CommunicationNotification;
import com.rut_mental_health_care.model.Like;
import com.rut_mental_health_care.model.User;
import com.rut_mental_health_care.repository.CommunicationNotificationRepository;
import com.rut_mental_health_care.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class CommunicationNotificationServiceImpl implements CommunicationNotificationService {

    private final UserRepository userRepository;
    private final CommunicationNotificationRepository communicationNotificationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public CommunicationNotificationServiceImpl(UserRepository userRepository,
                                                CommunicationNotificationRepository communicationNotificationRepository,
                                                SimpMessagingTemplate messagingTemplate) {
        this.userRepository = userRepository;
        this.communicationNotificationRepository = communicationNotificationRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public void createNotification(Long senderId, Comment comment) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + senderId));

        Long recipientId = comment.getUser().getId();
        User recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + recipientId));

        CommunicationNotification communicationNotification = new CommunicationNotification();

        communicationNotification.setSender(sender);
        communicationNotification.setRecipient(recipient);
        communicationNotification.setComment(comment);

        String message = recipient.getUsername() + "has left a comment on your post";

        communicationNotification.setMessage(message);

        communicationNotificationRepository.save(communicationNotification);

        sendNotification("/user/" + recipient.getUsername() + "/queue/notifications", communicationNotification);
    }

    @Override
    public void createNotification(Long senderId, Like like) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + senderId));

        Long recipientId = like.getUser().getId();
        User recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + recipientId));

        CommunicationNotification communicationNotification = new CommunicationNotification();

        communicationNotification.setSender(sender);
        communicationNotification.setRecipient(recipient);
        communicationNotification.setLike(like);

        String message = recipient.getUsername() + "has liked your post";

        communicationNotification.setMessage(message);

        communicationNotificationRepository.save(communicationNotification);

        sendNotification("/user/" + recipient.getUsername() + "/queue/notifications", communicationNotification);
    }

    private void sendNotification(String destination, CommunicationNotification notification) {
        messagingTemplate.convertAndSend(destination, notification);
    }
}
