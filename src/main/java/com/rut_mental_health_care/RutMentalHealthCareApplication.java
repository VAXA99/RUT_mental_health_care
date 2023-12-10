package com.rut_mental_health_care;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EnableScheduling
public class RutMentalHealthCareApplication {

    public static void main(String[] args) {
        SpringApplication.run(RutMentalHealthCareApplication.class, args);
    }

}
