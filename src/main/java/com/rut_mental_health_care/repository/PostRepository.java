package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

    // Query to get the like count for a post
    @Query("SELECT COUNT(l) FROM Like l WHERE l.post = :post AND l.isLike = true")
    long getLikeCount(@Param("post") Post post);

    // Query to get the dislike count for a post
    @Query("SELECT COUNT(l) FROM Like l WHERE l.post = :post AND l.isLike = false")
    long getDislikeCount(@Param("post") Post post);

    // Query to get the comment count for a post
    @Query("SELECT COUNT(c) FROM Comment c WHERE c.post = :post")
    long getCommentCount(@Param("post") Post post);
}
