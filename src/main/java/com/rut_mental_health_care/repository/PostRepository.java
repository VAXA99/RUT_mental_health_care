package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
