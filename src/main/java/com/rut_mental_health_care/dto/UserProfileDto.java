package com.rut_mental_health_care.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {
    private Long userId;
    private String username;
    private String roles;
    private String phoneNumber;
    private String name;
    private String surname;
    private String middleName;
    private String email;
    private String bio;
    private LocalDate dateOfBirth;
    private int age;
    private int sex;
    private List<PostDto> postDtos;
    private List<ArticleDto> articleDtos;
    private long totalPosts;
    private long totalComments;
    private long totalLikes;

    public UserProfileDto(Long userId, String name, String surname, String middleName, String bio) {
        this.userId = userId;
        this.name = name;
        this.surname = surname;
        this.middleName = middleName;
        this.bio = bio;
    }

    public UserProfileDto(Long userId, String name, String surname, String middleName, String bio, String username) {
        this.userId = userId;
        this.name = name;
        this.surname = surname;
        this.middleName = middleName;
        this.bio = bio;
        this.username = username;
    }
}
