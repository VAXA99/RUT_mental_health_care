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

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import com.rut_mental_health_care.entity.Consultation;
import com.rut_mental_health_care.repository.ConsultationRepository;

@Service
public class ConsultationServiceImpl implements ConsultationService {
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
            throw new EntityNotFoundException("User with ID " + patient.getId() + " is not a patient.");
        }

        if (!psychologist.getRoles().equals("ROLE_PSYCHOLOGIST")) {
            throw new EntityNotFoundException("User with ID " + psychologist.getId() + " is not a psychologist.");
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
        String patientNotificationDescription = "";
        String psychologistNotificationDescription = "";
        String subject = "";

        DateTimeFormatter formatterToDate = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        DateTimeFormatter formatterToTime = DateTimeFormatter.ofPattern("HH:mm");

        LocalDateTime startsAt = consultation.getStartsAt();
        LocalDateTime endsAt = consultation.getEndsAt();

        User patient = consultation.getPatient();
        User psychologist = consultation.getPsychologist();

        String location = consultation.getLocation().getDescription();
        String date = consultation.getStartsAt().format(formatterToDate);
        String timeStartsAt = startsAt.format(formatterToTime);
        String timeEndsAt = endsAt.format(formatterToTime);

        String psychologistSurname = psychologist.getSurname();
        String psychologistName = psychologist.getName();

        String patientName = patient.getName();
        String patientSurname = patient.getSurname();

        StringBuilder stringBuilder = new StringBuilder();

        for (PsychProblem psychProblem : consultation.getPsychProblems()) {
            stringBuilder.append(psychProblem.getDescription()).append(" ");
        }

        String psychProblems = stringBuilder.toString().trim();

        // получает разницу между двумя датами в часах и минутах
        long millis = Duration.between(startsAt, endsAt).toMillis();
        String duration = String.format("%d часов %d минут",
                TimeUnit.MILLISECONDS.toHours(millis),
                TimeUnit.MILLISECONDS.toMinutes(millis) - TimeUnit.HOURS.toMinutes(TimeUnit.MILLISECONDS.toHours(millis)));

        String descriptionForPatient = "Ваш врач: " + psychologistSurname + " " + psychologistName + "\n"
                + "Телефон связи с врачом: " + psychologist.getPhoneNumber() + "\n"
                + "Место: " + location + "\n"
                + "Дата: " + date + "\n"
                + "Время: " + timeStartsAt + " - " + timeEndsAt + "  (" + duration + ")";

        String descriptionForPsychologist = "Ваш пациент: " + patientSurname + " " + patientName + "\n"
                + "Место: " + location + "\n"
                + "Дата: " + date + "\n"
                + "Время: " + timeStartsAt + " - " + timeEndsAt + "  (" + duration + ")" + "\n"
                + "Данные о проблеме: " + psychProblems;

        if (status == cancel) {
            subject = "Ваша консультация была отменена";
            patientNotificationDescription = "Здравствуйте, " + patientName + ", Ваша консультация была отменена: \n"
                    + descriptionForPatient;
            psychologistNotificationDescription = "Здравствуйте, " + psychologistName + ", Ваша консультация была отменена: \n"
                    + descriptionForPsychologist;
        }
        else if (status == setUp) {
            subject = "Вам назначена консультация";
            patientNotificationDescription = "Здравствуйте, " + patientName + ", Вам назначена консультация: \n"
                    + descriptionForPatient;
            psychologistNotificationDescription = "Здравствуйте, " + psychologistName + ", Вам назначена консультация: \n"
                    + descriptionForPsychologist;
        }
        else if (status == update) {
            subject = "Данные по вашей консультации обновились";
            patientNotificationDescription = "Здравствуйте, " + patientName + ", данные по вашей консультации обновились. Новые данные: \n"
                    + descriptionForPatient;
            psychologistNotificationDescription = "Здравствуйте, " + psychologistName + ", данные по вашей консультации обновились. Новые данные: \n"
                    + descriptionForPsychologist;
        }

        ConsultationNotification consultationNotification = new ConsultationNotification();
        consultationNotification.setConsultation(consultation);
        consultationNotification.setDescription(patientNotificationDescription);
        consultationNotificationRepository.save(consultationNotification);

        mailService.send(mailService.constructEmail(subject, patientNotificationDescription, patient));
        mailService.send(mailService.constructEmail(subject, psychologistNotificationDescription, psychologist));
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

    public ConsultationDto convertToConsultationDto(Consultation consultation) {
        ConsultationDto consultationDto = modelMapper.map(consultation, ConsultationDto.class);

        UserDto patientDto = modelMapper.map(consultation.getPatient(), UserDto.class);
        UserDto psychologistDto = modelMapper.map(consultation.getPsychologist(), UserDto.class);
        consultationDto.setPatient(patientDto);
        consultationDto.setPsychologist(psychologistDto);

        return consultationDto;
    }
}

