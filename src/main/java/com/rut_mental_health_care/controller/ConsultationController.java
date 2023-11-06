package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.dto.ConsultationDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.entity.ConsultationNotification;
import com.rut_mental_health_care.service.consultation.ConsultationService;
import com.rut_mental_health_care.service.consultation.ConsultationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultations")
public class ConsultationController {

    private ConsultationServiceImpl consultationService;

    @Autowired
    public ConsultationController(ConsultationServiceImpl consultationService) {
        this.consultationService = consultationService;
    }

    @GetMapping("/notifications")
    public List<ConsultationNotification> getAllConsNotifications() {
        return consultationService.getAllConsNotifications();
    }

    @GetMapping("/all")
    public List<ConsultationDto> getAllConsultations(@RequestBody UserDto userDto) {
        return consultationService.getAllConsultations(userDto);
    }

    @PostMapping("/setup")
    public void setUpConsultation(@RequestBody ConsultationDto consultationDto) {
        consultationService.setUpConsultation(consultationDto);
    }

    @PutMapping("/update/{consultationId}")
    public void updateConsultation(@PathVariable Long consultationId, @RequestBody ConsultationDto consultationDto) {
        consultationService.updateConsultation(consultationId, consultationDto);
    }

    @DeleteMapping("/cancel/{consultationId}")
    public void cancelConsultation(@PathVariable Long consultationId) {
        consultationService.cancelConsultation(consultationId);
    }

    @PostMapping("/remind")
    public void remindConsultationParticipants() {
        consultationService.remindConsultationParticipants();
    }
}
