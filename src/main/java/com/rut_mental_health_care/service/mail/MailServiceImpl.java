package com.rut_mental_health_care.service.mail;

import com.rut_mental_health_care.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSenderImpl javaMailSender;

    public void send(SimpleMailMessage mailMessage) {
        javaMailSender.send(mailMessage);
    }

    //TODO rework URL
    public SimpleMailMessage constructResetTokenEmail(
            String contextPath, String token, User user) {
        String url = contextPath + "/user/changePassword?token=" + token;
        String message = "Для смены пароля перейдите по ссылке: ";
        return constructEmail("Смена пароля", message + " \r\n" + url, user);
    }

    public SimpleMailMessage constructEmail(
            String subject, String body, User user) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(subject);
        email.setText(body);
        email.setTo(user.getEmail());
        email.setFrom("rutmentalhealthcare@yandex.ru");
        return email;
    }
}
