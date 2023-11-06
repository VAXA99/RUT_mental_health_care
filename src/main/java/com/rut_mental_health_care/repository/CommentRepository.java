package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.entity.Comment;
import com.rut_mental_health_care.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findCommentByPostId(Long postId);
}
