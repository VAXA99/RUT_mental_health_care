package com.rut_mental_health_care.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    private long totalPosts;
    private long totalComments;
    private long totalLikes;
}
