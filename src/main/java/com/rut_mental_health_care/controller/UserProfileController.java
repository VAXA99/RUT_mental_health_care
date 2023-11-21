package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.dto.UserProfileDto;
import com.rut_mental_health_care.service.user.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000/")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("/profile/{userId}")
    public UserProfileDto getUserProfile(@PathVariable Long userId) {
        return userProfileService.getUserProfile(userId);
    }

    @PatchMapping("/profile/editUsername/{userId}")
    public void editUsername(@PathVariable Long userId, @RequestParam String newUsername) {
        userProfileService.editUsername(userId, newUsername);
    }

    @PatchMapping("/profile/editName/{userId}")
    public void editName(@PathVariable Long userId, @RequestParam String newName) {
        userProfileService.editName(userId, newName);
    }

    @PatchMapping("/profile/editSurname/{userId}")
    public void editSurname(@PathVariable Long userId, @RequestParam String newSurname) {
        userProfileService.editSurname(userId, newSurname);
    }

    @PatchMapping("/profile/editMiddleName/{userId}")
    public void editMiddleName(@PathVariable Long userId, @RequestParam String newMiddleName) {
        userProfileService.editMiddleName(userId, newMiddleName);
    }

    @PatchMapping("/profile/editEmail/{userId}")
    public void editEmail(@PathVariable Long userId, @RequestParam String newEmail) {
        userProfileService.editEmail(userId, newEmail);
    }

    @PatchMapping("/profile/editBio/{userId}")
    public void editBio(@PathVariable Long userId, @RequestParam String newBio) {
        userProfileService.editBio(userId, newBio);
    }

    @GetMapping("/psychologistsProfiles")
    public List<UserProfileDto> getPsychologistsProfile() {
        return userProfileService.getPsychologistsProfile();
    }

}
