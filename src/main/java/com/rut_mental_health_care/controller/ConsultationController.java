package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.controller.request.ConsultationRequest;
import com.rut_mental_health_care.dto.ConsultationDto;
import com.rut_mental_health_care.model.ConsultationNotification;
import com.rut_mental_health_care.model.PsychProblem;
import com.rut_mental_health_care.service.consultation.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin("http://localhost:3000/")
public class ConsultationController {

    private final ConsultationService consultationService;

    @Autowired
    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    @GetMapping("/getProblems")
    public ResponseEntity<List<PsychProblem>> getAllPsychProblems() {
        try {
            List<PsychProblem> psychProblems = consultationService.getAllProblems();
            return ResponseEntity.ok(psychProblems);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
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

    @GetMapping("/all/{userId}")
    public ResponseEntity<List<ConsultationDto>> getAllConsultations(@PathVariable Long userId) {
        try {
            List<ConsultationDto> consultations = consultationService.getAllConsultations(userId);
            return ResponseEntity.ok(consultations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("hasActiveConsultationSetUp")
    public boolean hasActiveConsultationSetUp(@RequestParam Long userId) {
        return consultationService.hasActiveConsultationSetUp(userId);
    }

    @GetMapping("/allAvailable")
    public ResponseEntity<?> getAvailableConsultationsForDate(@RequestParam String chosenDate, Long psychologistId) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH);
            LocalDate localDate = LocalDate.parse(chosenDate, formatter);
            List<ConsultationDto> consultations = consultationService.getAvailableConsultationsForDate(localDate, psychologistId);
            return ResponseEntity.ok(consultations);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid date format or null date");
        }
    }

    @GetMapping("/allUnavailable")
    public ResponseEntity<?> getUnavailableConsultationsForDate(@RequestParam String chosenDate, Long psychologistId) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH);
            LocalDate localDate = LocalDate.parse(chosenDate, formatter);
            List<ConsultationDto> consultations = consultationService.getUnavailableConsultationsForDate(localDate, psychologistId);
            return ResponseEntity.ok(consultations);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid date format or null date");
        }
    }

    @PostMapping("/setUp/{consultationId}")
    public ResponseEntity<String> setUpConsultation(@PathVariable Long consultationId, @RequestBody ConsultationRequest consultationRequest) {
        try {
            consultationService.setUpConsultation(consultationId, consultationRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body("Consultation set up successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error setting up consultation: " + e.getMessage());
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

    @GetMapping("/getScheduleForMonth")
    public ResponseEntity<List<ConsultationDto>> getScheduleForMonth(@RequestParam int year, int month, Long psychologistId) {
        return ResponseEntity.ok(consultationService.getAllAvailableForMonth(year, month, psychologistId));
    }
}
