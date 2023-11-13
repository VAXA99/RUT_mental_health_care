package com.rut_mental_health_care.dto;

import com.rut_mental_health_care.entity.Location;
import com.rut_mental_health_care.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationDto {
        private Long id;
        private UserDto patient;
        private UserDto psychologist;
        private List<String> psychProblems;
        private LocalDateTime startsAt;
        private LocalDateTime endsAt;
        private Location location;
}
