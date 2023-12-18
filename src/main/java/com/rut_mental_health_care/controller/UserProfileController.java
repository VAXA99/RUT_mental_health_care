package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.controller.request.UserProfileRequest;
import com.rut_mental_health_care.dto.UserProfileDto;
import com.rut_mental_health_care.model.File;
import com.rut_mental_health_care.service.user.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin("http://localhost:3000/")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("/user/{userId}")
    public UserProfileDto getUserProfile(@PathVariable Long userId) {
        return userProfileService.getUserProfile(userId);
    }

    @GetMapping("/username/{username}")
    public UserProfileDto getUserProfile(@PathVariable String username) {
        return userProfileService.getUserProfile(username);
    }

    @PutMapping("/edit/{userId}")
    public ResponseEntity<?> editUserProfile(@PathVariable Long userId, @RequestBody UserProfileRequest userProfileRequest) {
        try {
            userProfileService.editUserProfile(userId,
                    userProfileRequest.getUsername(),
                    userProfileRequest.getPhoneNumber(),
                    userProfileRequest.getName(),
                    userProfileRequest.getSurname(),
                    userProfileRequest.getMiddleName(),
                    userProfileRequest.getEmail(),
                    userProfileRequest.getBio(),
                    userProfileRequest.getDateOfBirth(),
                    userProfileRequest.getSex()
            );

            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating user profile.");
        }
    }

    @GetMapping("/psychologistsProfiles")
    public List<UserProfileDto> getPsychologistsProfile() {
        return userProfileService.getPsychologistsProfile();
    }

    @GetMapping("/profilePicture/{username}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable String username) {
        File file = userProfileService.getProfilePicture(username);

        if (file == null) {
            return ResponseEntity.notFound()
                    .build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .contentType(MediaType.valueOf(file.getContentType()))
                .body(file.getData());
    }

    @PostMapping("/uploadProfilePicture/{userId}")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        try {
            userProfileService.uploadProfilePicture(userId, file);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(String.format("File uploaded successfully: %s", file.getOriginalFilename()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(String.format("Could not upload the file: %s!", file.getOriginalFilename()));
        }
    }

    @DeleteMapping("/deleteProfilePicture/{userId}")
    public ResponseEntity<String> deleteProfilePicture(@PathVariable Long userId) {
        try {
            userProfileService.deleteProfilePicture(userId);
            return new ResponseEntity<>("Profile picture deleted successfully", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("An error occurred while deleting the profile picture", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
