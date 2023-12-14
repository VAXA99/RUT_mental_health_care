package com.rut_mental_health_care.service.consultation;

import com.rut_mental_health_care.controller.request.ConsultationRequest;
import com.rut_mental_health_care.dto.ConsultationDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.model.Consultation;
import com.rut_mental_health_care.model.ConsultationNotification;

import java.lang.invoke.CallSite;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface  ConsultationService {
    List<ConsultationNotification> getAllConsNotifications();
    List<ConsultationDto> getAllConsultations(Long userId);
    public boolean hasActiveConsultationSetUp(Long userId);
    List<ConsultationDto> getAvailableConsultationsForDate(LocalDate chosenDate, Long psychologistId);
    void setUpConsultation(Long consultationId, ConsultationRequest consultationRequest);
    void cancelConsultation(Long consultationId);
    List<ConsultationDto> getAllAvailableForMonth(int year, int month, Long psychologistId);
}
