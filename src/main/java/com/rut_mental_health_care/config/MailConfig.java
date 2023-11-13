package com.rut_mental_health_care.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {
    @Value("${mail.host}")
    private String host = "localhost";

    @Value("${mail.port}")
    private int port;

    @Value("${mail.username}")
    private String username;

    @Value("${mail.password}")
    private String password;

    @Value("${mail.auth}")
    private Boolean smtpAuth;

    @Value("${mail.tls}")
    private Boolean tls;

    @Value("${mail.protocol}")
    private String protocol;

    @Bean
    public JavaMailSenderImpl javaMailSender() {

        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setHost(host);
        sender.setPort(port);
        sender.setUsername(username);
        sender.setPassword(password);

        Properties sendProperties = new Properties(5);
        sendProperties.setProperty("mail.smtp.auth", smtpAuth.toString());
        sendProperties.setProperty("mail.smtp.starttls.enable", tls.toString());
        sendProperties.setProperty("mail.transport.protocol", protocol);
        sendProperties.setProperty("mail.smtp.ssl.trust", "*");
        sendProperties.setProperty("mail.debug", "true");
        sender.setJavaMailProperties(sendProperties);
        return sender;
    }
}
