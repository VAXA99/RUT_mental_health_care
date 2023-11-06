package com.rut_mental_health_care.service.consultation;

import com.rut_mental_health_care.dto.ConsultationDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.entity.ConsultationNotification;
import com.rut_mental_health_care.entity.User;
import com.rut_mental_health_care.repository.ConsultationNotificationRepository;
import com.rut_mental_health_care.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.rut_mental_health_care.entity.Consultation;
import com.rut_mental_health_care.repository.ConsultationRepository;

@Service
public class ConsultationServiceImpl {
    private final ConsultationRepository consultationRepository;
    private final ConsultationNotificationRepository consultationNotificationRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ConsultationServiceImpl(
            ConsultationRepository consultationRepository,
            ConsultationNotificationRepository consultationNotificationRepository,
            UserRepository userRepository,
            ModelMapper modelMapper) {
        this.consultationRepository = consultationRepository;
        this.consultationNotificationRepository = consultationNotificationRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public List<ConsultationNotification> getAllConsNotifications() {
        return consultationNotificationRepository.findAll();
    }

    public List<ConsultationDto> getAllConsultations(UserDto userDto) {
        String role = userDto.getRoles();
        List<Consultation> consultations;
        if (role.equals("ROLE_USER")) {
            consultations = consultationRepository.findAllByPatientId(userDto.getId());
        } else {
            consultations = consultationRepository.findAllByPsychologistId(userDto.getId());
        }
        return consultations.stream()
                .map(this::convertToConsultationDto)
                .collect(Collectors.toList());
    }

    public void setUpConsultation(ConsultationDto consultationDto) {

        Consultation consultation = modelMapper.map(consultationDto, Consultation.class);
        User patient = userRepository.findById(consultationDto.getPatient().getId())
                        .orElseThrow(()->new EntityNotFoundException("User not found with id:" + consultationDto.getPatient().getId()));

        User psychologist = userRepository.findById(consultationDto.getPsychologist().getId())
                .orElseThrow(()->new EntityNotFoundException("User not found with id:" + consultationDto.getPatient().getId()));

        consultation.setPatient(patient);
        consultation.setPsychologist(psychologist);

        consultationRepository.save(consultation);
    }


    //todo change input parameters
    public void updateConsultation(Long consultationId, ConsultationDto consultationDto) {
        Consultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new EntityNotFoundException("Consultation not found with id:" + consultationId));
        consultation.setStartsAt(consultationDto.getStartsAt());
        consultation.setEndsAt(consultationDto.getEndsAt());
    }

    public void cancelConsultation(Long consultationId) {
        consultationRepository.deleteById(consultationId);
    }

    // Method to remind the patient and doctor about the consultation 1 day before and 2 hours before it.
    public void remindConsultationParticipants() {
        // Calculate the reminder times (1 day before and 2 hours before)
        LocalDateTime oneDayBefore = LocalDateTime.now().plusDays(1);
        LocalDateTime twoHoursBefore = LocalDateTime.now().plusHours(2);

        // Find consultations that match the reminder times
        List<Consultation> consultationsToRemind = consultationRepository.findConsultationsToRemind(oneDayBefore, twoHoursBefore);

        for (Consultation consultation : consultationsToRemind) {
            // Create consultation notification for the patient
            ConsultationNotification patientNotification = new ConsultationNotification();
            patientNotification.setConsultation(consultation);
            patientNotification.setRead(false);
            patientNotification.setDescription("Your consultation is scheduled for " + consultation.getStartsAt());

            // Create consultation notification for the doctor
            ConsultationNotification doctorNotification = new ConsultationNotification();
            doctorNotification.setConsultation(consultation);
            doctorNotification.setRead(false);
            doctorNotification.setDescription("Your consultation with " + consultation.getPatient().getName() + consultation.getPatient().getSurname() +
                    " is scheduled for " + consultation.getStartsAt());

            // Save the notifications
            consultationNotificationRepository.save(patientNotification);
            consultationNotificationRepository.save(doctorNotification);
        }
    }

    public ConsultationDto convertToConsultationDto(Consultation consultation) {
        ConsultationDto consultationDto = modelMapper.map(consultation, ConsultationDto.class);

        UserDto patientDto = modelMapper.map(consultation.getPatient(), UserDto.class);
        UserDto psychologistDto = modelMapper.map(consultation.getPsychologist(), UserDto.class);
        consultationDto.setPatient(patientDto);
        consultationDto.setPsychologist(psychologistDto);

        return consultationDto;
    }
}

