package com.rut_mental_health_care.service.user;


import com.rut_mental_health_care.dto.UserProfileDto;

public interface UserProfileService {
    long getUserPostCount(Long userId);
    long getTotalLikesOnUserPosts(Long userId);
    long getTotalCommentsOnUserPosts(Long userId);
    UserProfileDto getUserProfileStatistics(Long userId);
}
