package com.rut_mental_health_care.service.user;

import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.dto.UserProfileDto;
import com.rut_mental_health_care.model.File;
import com.rut_mental_health_care.model.Post;
import com.rut_mental_health_care.model.User;
import com.rut_mental_health_care.repository.PostRepository;
import com.rut_mental_health_care.repository.UserRepository;
import com.rut_mental_health_care.service.file.FileService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final FileService fileService;
    private final ModelMapper modelMapper;

    @Autowired
    public UserProfileServiceImpl(PostRepository postRepository,
                                  UserRepository userRepository,
                                  FileService fileService,
                                  ModelMapper modelMapper) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.fileService = fileService;
        this.modelMapper = modelMapper;
    }

    public String getUserUsername(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getUsername();
    }

    public String getUserRoles(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getRoles();
    }

    public String getUserPhoneNumber(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getPhoneNumber();
    }

    public String getUserName(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getName();
    }

    public String getUserSurname(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getSurname();
    }

    public String getUserMiddleName(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getMiddleName();
    }

    public String getUserEmail(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getEmail();
    }

    public String getUserBio(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getInformation();
    }


    public LocalDate getUserDateOfBirth(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getDateOfBirth();
    }

    public int getUserAge(Long userId) {
        return userRepository.countUserAge(userId);
    }

    public int getUserSex(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getSex();
    }

    private long getUserPostCount(Long userId) {
        return postRepository.getUserPostCount(userId);
    }

    private long getTotalLikesOnUserPosts(Long userId) {
        return postRepository.getTotalLikesOnUserPosts(userId);
    }

    private long getTotalCommentsOnUserPosts(Long userId) {
        return postRepository.getTotalCommentsOnUserPosts(userId);
    }

    @Override
    public UserProfileDto getUserProfile(Long userId) {

        String username = getUserUsername(userId);
        String roles = getUserRoles(userId);
        String phoneNumber = getUserPhoneNumber(userId);
        String name = getUserName(userId);
        String surname = getUserSurname(userId);
        String middleName = getUserMiddleName(userId);
        String email = getUserEmail(userId);
        String bio = getUserBio(userId);
        LocalDate dateOfBirth = getUserDateOfBirth(userId);
        int age = getUserAge(userId);
        int sex = getUserSex(userId);
        long totalPosts = getUserPostCount(userId);
        long totalComments = getTotalCommentsOnUserPosts(userId);
        long totalLikes = getTotalLikesOnUserPosts(userId);


        return new UserProfileDto(
                userId,
                username,
                roles,
                phoneNumber,
                name,
                surname,
                middleName,
                email,
                bio,
                dateOfBirth,
                age,
                sex,
                totalPosts,
                totalComments,
                totalLikes);
    }

    @Override
    public UserProfileDto getUserProfile(String username) {
        Long userId = userRepository.findUserIdByUsername(username);
        return getUserProfile(userId);
    }

    @Override
    @Async
    public void editUserProfile(Long userId,
                                String username,
                                String phoneNumber,
                                String name,
                                String surname,
                                String middleName,
                                String email,
                                String bio,
                                LocalDate dateOfBirth,
                                Integer sex) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        editUserUsername(user, username);
        editUserPhoneNumber(user, phoneNumber);
        editUserName(user, name);
        editUserSurname(user, surname);
        editUserMiddleName(user, middleName);
        editUserEmail(user, email);
        editUserBio(user, bio);
        editUserDateOfBirth(user, dateOfBirth);
        editUserSex(user, sex);

        userRepository.save(user);
    }

    public List<UserProfileDto> getPsychologistsProfile() {
        List<User> psychologists = userRepository.findAllByRoles("ROLE_PSYCHOLOGIST");

        return psychologists.stream()
                .map(user -> new UserProfileDto(
                        user.getId(),
                        user.getName(),
                        user.getSurname(),
                        user.getMiddleName(),
                        user.getInformation(),
                        user.getUsername()
                ))
                .collect(Collectors.toList());
    }

    private void editUserUsername(User user, String username) {
        user.setUsername(username);
    }

    private void editUserPhoneNumber(User user, String phoneNumber) {
        user.setPhoneNumber(phoneNumber);
    }

    private void editUserName(User user, String name) {
        user.setName(name);
    }

    private void editUserSurname(User user, String surname) {
        user.setSurname(surname);
    }

    private void editUserMiddleName(User user, String middleName) {
        user.setMiddleName(middleName);
    }

    private void editUserEmail(User user, String email) {
        user.setEmail(email);
    }

    private void editUserBio(User user, String bio) {
        user.setInformation(bio);
    }

    private void editUserDateOfBirth(User user, LocalDate dateOfBirth) {
        user.setDateOfBirth(dateOfBirth);
    }

    private void editUserSex(User user, Integer sex) {
        user.setSex(sex);
    }

    @Override
    @Transactional
    public File getProfilePicture(String username) {
        Long userId = userRepository.findUserIdByUsername(username);
        return fileService.findByUserId(userId);
    }

    @Override
    @Transactional
    public void uploadProfilePicture(Long userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        user.setProfilePicture(fileService.uploadFile(file));

        userRepository.save(user);
    }

    @Override
    @Async
    @Transactional
    public void deleteProfilePicture(Long userId) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        user.setProfilePicture(fileService.deleteByUserId(userId));
    }
}
