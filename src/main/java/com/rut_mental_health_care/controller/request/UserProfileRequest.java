package com.rut_mental_health_care.controller.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserProfileRequest {
    private String username;
    private String phoneNumber;
    private String name;
    private String surname;
    private String middleName;
    private String email;
    private String bio;
    private LocalDate dateOfBirth;
    private int sex;
}
