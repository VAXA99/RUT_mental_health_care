package com.rut_mental_health_care.service.consultation;

import com.rut_mental_health_care.dto.ConsultationDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.entity.ConsultationNotification;
import com.rut_mental_health_care.entity.PsychProblem;
import com.rut_mental_health_care.entity.User;
import com.rut_mental_health_care.repository.ConsultationNotificationRepository;
import com.rut_mental_health_care.repository.PsychProblemRepository;
import com.rut_mental_health_care.repository.UserRepository;
import com.rut_mental_health_care.service.mail.MailService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.rut_mental_health_care.entity.Consultation;
import com.rut_mental_health_care.repository.ConsultationRepository;

import javax.management.relation.Role;

@Service
public class ConsultationServiceImpl {
    private final ConsultationRepository consultationRepository;
    private final ConsultationNotificationRepository consultationNotificationRepository;
    private final UserRepository userRepository;
    private  final PsychProblemRepository psychProblemRepository;
    private final MailService mailService;
    private final ModelMapper modelMapper;

    private final int cancel = 0;
    private final int setUp = 1;
    private final int update = 2;

    @Autowired
    public ConsultationServiceImpl(ConsultationRepository consultationRepository,
                                   ConsultationNotificationRepository consultationNotificationRepository,
                                   UserRepository userRepository, PsychProblemRepository psychProblemRepository,
                                   MailService mailService,
                                   ModelMapper modelMapper) {
        this.consultationRepository = consultationRepository;
        this.consultationNotificationRepository = consultationNotificationRepository;
        this.userRepository = userRepository;
        this.psychProblemRepository = psychProblemRepository;
        this.mailService = mailService;
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

    @Async
    public void setUpConsultation(ConsultationDto consultationDto) {
        Long patientId = consultationDto.getPatient().getId();
        Long psychologistId = consultationDto.getPsychologist().getId();

        Consultation consultation = modelMapper.map(consultationDto, Consultation.class);

        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + consultationDto.getPatient().getId()));

        User psychologist = userRepository.findById(psychologistId)
                .orElseThrow(() -> new EntityNotFoundException("Psychologist not found with id: " + consultationDto.getPsychologist().getId()));

        // Ensure roles are correctly assigned
        if (!patient.getRoles().equals("ROLE_USER")) {
            throw new IllegalArgumentException("User with ID " + patient.getId() + " is not a patient.");
        }

        if (!psychologist.getRoles().equals("ROLE_PSYCHOLOGIST")) {
            throw new IllegalArgumentException("User with ID " + psychologist.getId() + " is not a psychologist.");
        }

        // Set the correct patient and psychologist in the consultation
        consultation.setPatient(patient);
        consultation.setPsychologist(psychologist);

        System.out.println(consultation.getPatient());
        System.out.println(consultation.getPsychologist());

    List<PsychProblem> psychProblems = new ArrayList<>();
        for (String psychProblem: consultationDto.getPsychProblems()) {
            PsychProblem psychProblem_ = psychProblemRepository.findByDescription(psychProblem).orElseGet(() -> {
                PsychProblem newPsychProblem = new PsychProblem();
                newPsychProblem.setDescription(psychProblem);
                return psychProblemRepository.save(newPsychProblem);
            });
            psychProblems.add(psychProblem_);
        }

        consultation.setPsychProblems(psychProblems);

        consultationRepository.save(consultation);
        sendNotificationOnConsultation(consultation.getId(), setUp);
    }

    private void sendNotificationOnConsultation(Long consultationId, int status) {
        Consultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new EntityNotFoundException("Consultation not found with id:" + consultationId));
        String notificationDescription = "";
        String subject = "";
        if (status == cancel) {
            subject = "Ваша консультация была отменена";
            notificationDescription = "Ваша консультация была отменена:"
                    + consultation.getLocation() + " "
                    + consultation.getStartsAt() + " "
                    + consultation.getPsychologist().getSurname() + " "
                    + consultation.getPsychologist().getName();
        }
        else if (status == setUp) {
            subject = "Вам назначена консультация";
            notificationDescription = "Вам назначена консультация:"
                    + consultation.getLocation() + " "
                    + consultation.getStartsAt() + " "
                    + consultation.getPsychologist().getSurname() + " "
                    + consultation.getPsychologist().getName();
        }
        else if (status == update) {
            subject = "Данные по вашей консультации обновились";
            notificationDescription = "Данные по вашей консультации обновились. Новые данные:"
                    + consultation.getLocation() + " "
                    + consultation.getStartsAt() + " "
                    + consultation.getPsychologist().getSurname() + " "
                    + consultation.getPsychologist().getName();
        }

        ConsultationNotification consultationNotification = new ConsultationNotification();
        consultationNotification.setConsultation(consultation);
        consultationNotification.setDescription(notificationDescription);
        consultationNotificationRepository.save(consultationNotification);

        mailService.send(consultation.getPatient().getEmail(), subject, notificationDescription);

    }

    //todo change input parameters
    public void updateConsultation(Long consultationId, ConsultationDto updatedConsultationDto) {
        Consultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new EntityNotFoundException("Consultation not found with id:" + consultationId));
        consultation.setStartsAt(updatedConsultationDto.getStartsAt());
        consultation.setEndsAt(updatedConsultationDto.getEndsAt());
        sendNotificationOnConsultation(consultationId, update);
    }

    public void cancelConsultation(Long consultationId) {
        sendNotificationOnConsultation(consultationId, cancel);
        consultationRepository.deleteById(consultationId);
    }

    /*// Method to remind the patient and doctor about the consultation 1 day before and 2 hours before it.
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
    }*/

    public ConsultationDto convertToConsultationDto(Consultation consultation) {
        ConsultationDto consultationDto = modelMapper.map(consultation, ConsultationDto.class);

        UserDto patientDto = modelMapper.map(consultation.getPatient(), UserDto.class);
        UserDto psychologistDto = modelMapper.map(consultation.getPsychologist(), UserDto.class);
        consultationDto.setPatient(patientDto);
        consultationDto.setPsychologist(psychologistDto);

        return consultationDto;
    }
}

