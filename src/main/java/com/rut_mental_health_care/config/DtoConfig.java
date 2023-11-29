package com.rut_mental_health_care.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DtoConfig {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
