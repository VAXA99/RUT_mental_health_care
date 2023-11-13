package com.rut_mental_health_care.service.consultation;

import com.rut_mental_health_care.dto.ConsultationDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.entity.ConsultationNotification;

import java.util.List;

public interface ConsultationService {
    List<ConsultationNotification> getAllConsNotifications();
    List<ConsultationDto> getAllConsultations(UserDto userDto);
    void setUpConsultation(ConsultationDto consultationDto);
    void updateConsultation(Long consultationId, ConsultationDto consultationDto);
    void cancelConsultation(Long consultationId);
}
