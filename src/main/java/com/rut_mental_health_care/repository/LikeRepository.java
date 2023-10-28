package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.entity.Like;
import com.rut_mental_health_care.entity.Post;
import com.rut_mental_health_care.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Boolean existsByPostIdAndUserName(Long postId, String username);
    Like findByPostIdAndUserUsername(Long postId, String username);
}
