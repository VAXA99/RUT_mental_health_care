package com.rut_mental_health_care.service.user;


import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.dto.UserProfileDto;
import com.rut_mental_health_care.model.File;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface UserProfileService {
    UserProfileDto getUserProfile(Long userId);
    UserProfileDto getUserProfile(String username);

    void editUserProfile(Long userId,
                         String username,
                         String phoneNumber,
                         String name,
                         String surname,
                         String middleName,
                         String email,
                         String bio,
                         LocalDate dateOfBirth,
                         Integer sex);

    List<UserProfileDto> getPsychologistsProfile();

    File getProfilePicture(String username);

    void uploadProfilePicture(Long userId, MultipartFile file) throws IOException;

    void deleteProfilePicture(Long userId) throws IOException;
}
