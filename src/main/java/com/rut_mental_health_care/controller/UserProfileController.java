package com.rut_mental_health_care.controller;

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

    @GetMapping("/{userId}")
    public UserProfileDto getUserProfile(@PathVariable Long userId) {
        return userProfileService.getUserProfile(userId);
    }

    @PatchMapping("/editUsername/{userId}")
    public void editUsername(@PathVariable Long userId, @RequestParam String newUsername) {
        userProfileService.editUsername(userId, newUsername);
    }

    @PatchMapping("/editName/{userId}")
    public void editName(@PathVariable Long userId, @RequestParam String newName) {
        userProfileService.editName(userId, newName);
    }

    @PatchMapping("/editSurname/{userId}")
    public void editSurname(@PathVariable Long userId, @RequestParam String newSurname) {
        userProfileService.editSurname(userId, newSurname);
    }

    @PatchMapping("/editMiddleName/{userId}")
    public void editMiddleName(@PathVariable Long userId, @RequestParam String newMiddleName) {
        userProfileService.editMiddleName(userId, newMiddleName);
    }

    @PatchMapping("/editEmail/{userId}")
    public void editEmail(@PathVariable Long userId, @RequestParam String newEmail) {
        userProfileService.editEmail(userId, newEmail);
    }

    @PatchMapping("/editBio/{userId}")
    public void editBio(@PathVariable Long userId, @RequestParam String newBio) {
        userProfileService.editBio(userId, newBio);
    }
    @PatchMapping("/editDateOfBirth/{userId}")
    public void editDateOfBirth(@PathVariable Long userId, @RequestParam LocalDate dateOfBirth) {
        userProfileService.editUserDateOfBirth(userId, dateOfBirth);
    }

    @GetMapping("/psychologistsProfiles")
    public List<UserProfileDto> getPsychologistsProfile() {
        return userProfileService.getPsychologistsProfile();
    }

    @GetMapping("/profilePicture/{userId}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable Long userId) {
        File file = userProfileService.getProfilePicture(userId);

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
