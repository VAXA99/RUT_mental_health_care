package com.rut_mental_health_care.service.user;


import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.dto.UserProfileDto;
import com.rut_mental_health_care.model.File;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

public interface UserProfileService {
    String getUserUsername(Long userId);
    String getUserRoles(Long userId);
    String getUserName(Long userId);
    String getUserSurname(Long userId);
    String getUserMiddleName(Long userId);
    String getUserEmail(Long userId);
    String getUserBio(Long userId);
    int getUserAge(Long userId);
    File getProfilePicture(Long userId);
    List<PostDto> getUserPosts(Long userId);
    long getUserPostCount(Long userId);
    long getTotalLikesOnUserPosts(Long userId);
    long getTotalCommentsOnUserPosts(Long userId);
    UserProfileDto getUserProfile(Long userId);
    List<UserProfileDto> getPsychologistsProfile();
    void editUsername(Long userId, String newUsername);
    void editName(Long userId, String newName);
    void editSurname(Long userId, String newSurname);
    void editMiddleName(Long userId, String newMiddleName);
    void editEmail(Long userId, String newEmail);
    void editBio(Long userId, String newBio);
    void setUserDateOfBirth(Long userId, Date dateOfBirth);
    void uploadProfilePicture(Long userId, MultipartFile file) throws IOException;
    void deleteProfilePicture(Long userId);
}
