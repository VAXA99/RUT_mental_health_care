package com.rut_mental_health_care.controller.request;

import com.rut_mental_health_care.model.Location;
import com.rut_mental_health_care.model.User;
import lombok.Data;

import java.util.List;

@Data
public class ConsultationRequest {
    private Long userId;
    private List<String> psychProblems;
    private String description;
}
