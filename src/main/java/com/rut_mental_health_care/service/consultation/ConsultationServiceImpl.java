package com.rut_mental_health_care.service.consultation;

import com.rut_mental_health_care.controller.request.ConsultationRequest;
import com.rut_mental_health_care.dto.ConsultationDto;
import com.rut_mental_health_care.model.*;
import com.rut_mental_health_care.repository.*;
import com.rut_mental_health_care.service.mail.MailService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class ConsultationServiceImpl implements ConsultationService {
    private final ConsultationRepository consultationRepository;
    private final ConsultationNotificationRepository consultationNotificationRepository;
    private final UserRepository userRepository;
    private final PsychProblemRepository psychProblemRepository;
    private final LocationRepository locationRepository;
    private final MailService mailService;
    private final ModelMapper modelMapper;

    private final int cancel = 0;
    private final int setUp = 1;

    @Autowired
    public ConsultationServiceImpl(ConsultationRepository consultationRepository,
                                   ConsultationNotificationRepository consultationNotificationRepository,
                                   UserRepository userRepository,
                                   PsychProblemRepository psychProblemRepository,
                                   LocationRepository locationRepository,
                                   MailService mailService,
                                   ModelMapper modelMapper) {
        this.consultationRepository = consultationRepository;
        this.consultationNotificationRepository = consultationNotificationRepository;
        this.userRepository = userRepository;
        this.psychProblemRepository = psychProblemRepository;
        this.locationRepository = locationRepository;
        this.mailService = mailService;
        this.modelMapper = modelMapper;
    }

    public List<ConsultationNotification> getAllConsNotifications() {
        return consultationNotificationRepository.findAll();
    }

    @Override
    public List<ConsultationDto> getAllConsultations(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        String role = user.getRoles();

        List<Consultation> consultations;
        if (role.equals("ROLE_USER")) {
            consultations = consultationRepository.findAllByPatientId(userId);
        } else {
            consultations = consultationRepository.findAllByPsychologistId(userId);
        }
        return consultations.stream()
                .map(this::convertToConsultationDto)
                .collect(Collectors.toList());
    }

    @Override
    public boolean hasActiveConsultationSetUp(Long userId) {
        LocalDateTime now = LocalDateTime.now();
        List<Consultation> consultations = consultationRepository.hasActiveConsultationSetUp(userId, now);
        return !consultations.isEmpty();
    }

    @Override
    public List<ConsultationDto> getAvailableConsultationsForDate(LocalDate chosenDate, Long psychologistId) {
        LocalDateTime startDateTime = chosenDate.atStartOfDay(); // Convert LocalDate to LocalDateTime
        LocalDateTime nextDay = startDateTime.plusDays(1); // Get the next day
        User psychologist = userRepository.findById(psychologistId)
                .orElseThrow(() -> new EntityNotFoundException("Psychologist not found with id: " + psychologistId));

        List<Consultation> consultations = consultationRepository.findAllAvailableConsultationsForDate(startDateTime, nextDay, psychologist);
        return getConsultationDtos(consultations);
    }

    @Override
    @Async
    @Transactional
    public void setUpConsultation(Long consultationId, ConsultationRequest consultationRequest) {
        User patient = userRepository.findById(consultationRequest.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + consultationRequest.getUserId()));

        Consultation consultation =  consultationRepository.findById(consultationId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + consultationId));

        consultation.setPatient(patient);

        List<PsychProblem> psychProblems = new ArrayList<>();
        for (String psychProblem : consultationRequest.getPsychProblems()) {
            PsychProblem psychProblem_ = psychProblemRepository.findByDescription(psychProblem).orElseGet(() -> {
                PsychProblem newPsychProblem = new PsychProblem();
                newPsychProblem.setDescription(psychProblem);
                return psychProblemRepository.save(newPsychProblem);
            });
            psychProblems.add(psychProblem_);
        }

        Location location = locationRepository.findById(1L).orElseThrow(() -> new EntityNotFoundException("Location not found with id: " + 1 ));

        consultation.setPsychProblems(psychProblems);
        consultation.setDescription(consultationRequest.getDescription());
        consultation.setAvailable(false);
        consultation.setLocation(location);

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
        } else if (status == setUp) {
            subject = "Вам назначена консультация";
            patientNotificationDescription = "Здравствуйте, " + patientName + ", Вам назначена консультация: \n"
                    + descriptionForPatient;
            psychologistNotificationDescription = "Здравствуйте, " + psychologistName + ", Вам назначена консультация: \n"
                    + descriptionForPsychologist;
        }

        ConsultationNotification consultationNotification = new ConsultationNotification();
        consultationNotification.setConsultation(consultation);
        consultationNotification.setDescription(patientNotificationDescription);
        consultationNotificationRepository.save(consultationNotification);

        mailService.send(mailService.constructEmail(subject, patientNotificationDescription, patient));
        mailService.send(mailService.constructEmail(subject, psychologistNotificationDescription, psychologist));
    }

    public void cancelConsultation(Long consultationId) {
        sendNotificationOnConsultation(consultationId, cancel);
        consultationRepository.deleteById(consultationId);
    }

    @Override
    public List<ConsultationDto> getAllAvailableForMonth(int year, int month, Long psychologistId) {
        LocalDateTime startOfMonth = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime endOfMonth = startOfMonth.plusMonths(1).minusSeconds(1);

        List<Consultation> consultations = consultationRepository.findAllByAvailableAndStartsAtBetweenAndPsychologistId(true, startOfMonth, endOfMonth, psychologistId);
        return getConsultationDtos(consultations);
    }

    private List<ConsultationDto> getConsultationDtos(List<Consultation> consultations) {
        List<ConsultationDto> consultationDtos = consultations.stream()
                .map(this::convertToConsultationDto)
                .toList();

        for (ConsultationDto consultationDto: consultationDtos) {
            List<String> psychProblems = psychProblemRepository.findPsychProblemByConsultationId(consultationDto.getId());
            consultationDto.setPsychProblems(psychProblems);
        }

        return consultationDtos;
    }

    @Scheduled(cron = "0 0 0 * * MON-FRI") // This cron expression triggers the method every day from Monday to Friday at midnight
    public void generateDailyConsultations() {
        // Get all psychologists from the database
        List<User> psychologists = userRepository.findAllByRoles("ROLE_PSYCHOLOGIST"); // Assuming you have a User class with roles

        // Iterate over each psychologist and generate 4 consultations for the next day
        for (User psychologist : psychologists) {
            for (int i = 0; i < 4; i++) {
                LocalDateTime startsAt = LocalDateTime.now().plusDays(7).withHour(10).plusHours(i * 2); // Adjust the starting time based on your requirements, with a 30-minute gap
                LocalDateTime endsAt = startsAt.plusHours(1).plusMinutes(30); // Each consultation lasts for 1.5 hours

                Consultation consultation = new Consultation();
                consultation.setPatient(null); // You might want to set this to a default patient or leave it null
                consultation.setPsychologist(psychologist);
                consultation.setStartsAt(startsAt);
                consultation.setEndsAt(endsAt);
                consultation.setAvailable(true); // Assuming the consultation is available initially
                // Set other consultation properties

                consultationRepository.save(consultation);
            }
        }
    }

    public ConsultationDto convertToConsultationDto(Consultation consultation) {

        return modelMapper.map(consultation, ConsultationDto.class);
    }
}

