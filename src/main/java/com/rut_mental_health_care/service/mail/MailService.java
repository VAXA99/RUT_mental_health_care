package com.rut_mental_health_care.service.mail;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSenderImpl javaMailSender;

    public void send(String targetEmail, String message, String subject) throws MessagingException {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("schedania.vahtang@yandex.ru"); // Your authenticated sender email
        mailMessage.setTo(targetEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        javaMailSender.send(mailMessage);
    }
}
