package com.rut_mental_health_care.dto;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigDto {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
