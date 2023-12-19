package com.rut_mental_health_care.service.consultation;

import com.rut_mental_health_care.controller.request.ConsultationRequest;
import com.rut_mental_health_care.dto.ConsultationDto;
import com.rut_mental_health_care.model.ConsultationNotification;
import com.rut_mental_health_care.model.PsychProblem;

import java.time.LocalDate;
import java.util.List;

public interface  ConsultationService {
    List<ConsultationNotification> getAllConsNotifications();
    List<PsychProblem> getAllProblems();
    List<ConsultationDto> getAllConsultations(Long userId);
    boolean hasActiveConsultationSetUp(Long userId);
    List<ConsultationDto> getAvailableConsultationsForDate(LocalDate chosenDate, Long psychologistId);
    List<ConsultationDto> getUnavailableConsultationsForDate(LocalDate chosenDate, Long psychologistId);
    void setUpConsultation(Long consultationId, ConsultationRequest consultationRequest);
    void cancelConsultation(Long consultationId);
    List<ConsultationDto> getAllAvailableForMonth(int year, int month, Long psychologistId);
}
