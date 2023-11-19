package com.rut_mental_health_care.service.mail;

import com.rut_mental_health_care.model.User;
import org.springframework.mail.SimpleMailMessage;

public interface MailService {
    void send(SimpleMailMessage mailMessage);
    SimpleMailMessage constructResetTokenEmail(String contextPath, String token, User user);
    SimpleMailMessage constructEmail(String subject, String body, User user);
}
