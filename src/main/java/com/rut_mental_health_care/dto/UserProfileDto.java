package com.rut_mental_health_care.dto;

import com.rut_mental_health_care.model.File;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    private Long userId;
    private String username;
    private String roles;
    private String name;
    private String surname;
    private String middleName;
    private String email;
    private String bio;
    private int age;
    private List<PostDto> postDtos;
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
}
