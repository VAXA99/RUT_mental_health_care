package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Boolean existsByPostIdAndUserName(Long postId, String username);
    Like findByPostIdAndUserUsername(Long postId, String username);
}
