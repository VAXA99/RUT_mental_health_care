package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.dto.ConsultationDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.model.ConsultationNotification;
import com.rut_mental_health_care.service.consultation.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin("http://localhost:3000/")
public class ConsultationController {

    private final ConsultationService consultationService;

    @Autowired
    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<ConsultationNotification>> getAllConsNotifications() {
        try {
            List<ConsultationNotification> notifications = consultationService.getAllConsNotifications();
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<ConsultationDto>> getAllConsultations(@RequestBody UserDto userDto) {
        try {
            List<ConsultationDto> consultations = consultationService.getAllConsultations(userDto);
            return ResponseEntity.ok(consultations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/setUp")
    public ResponseEntity<String> setUpConsultation(@RequestBody ConsultationDto consultationDto) {
        try {
            consultationService.setUpConsultation(consultationDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Consultation set up successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error setting up consultation: " + e.getMessage());
        }
    }

    @PatchMapping("/update/{consultationId}")
    public ResponseEntity<String> updateConsultation(@PathVariable Long consultationId, @RequestBody ConsultationDto consultationDto) {
        try {
            consultationService.updateConsultation(consultationId, consultationDto);
            return ResponseEntity.ok("Consultation updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating consultation: " + e.getMessage());
        }
    }

    @DeleteMapping("/cancel/{consultationId}")
    public ResponseEntity<String> cancelConsultation(@PathVariable Long consultationId) {
        try {
            consultationService.cancelConsultation(consultationId);
            return ResponseEntity.ok("Consultation canceled successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error canceling consultation: " + e.getMessage());
        }
    }
}
