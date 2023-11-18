package com.rut_mental_health_care.service.user;

import com.rut_mental_health_care.dto.UserProfileDto;
import com.rut_mental_health_care.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final PostRepository postRepository;

    @Autowired
    public UserProfileServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public long getUserPostCount(Long userId) {
        return postRepository.getUserPostCount(userId);
    }

    @Override
    public long getTotalLikesOnUserPosts(Long userId) {
        return postRepository.getTotalLikesOnUserPosts(userId);
    }

    @Override
    public long getTotalCommentsOnUserPosts(Long userId) {
        return postRepository.getTotalCommentsOnUserPosts(userId);
    }


    public UserProfileDto getUserProfileStatistics(Long userId) {

        long totalPosts = getUserPostCount(userId);
        long totalComments = getTotalCommentsOnUserPosts(userId);
        long totalLikes = getTotalLikesOnUserPosts(userId);


        return new UserProfileDto(totalPosts, totalComments, totalLikes);
    }
}
