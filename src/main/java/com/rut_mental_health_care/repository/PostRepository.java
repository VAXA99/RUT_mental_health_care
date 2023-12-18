package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.model.Post;
import com.rut_mental_health_care.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p " +
            "ORDER BY p.createdAt DESC ")
    List<Post> getPostsFromNewestToOldest();

    @Query("SELECT p FROM Post p " +
            "ORDER BY (SIZE(p.likes) + SIZE(p.comments)) DESC")
    List<Post> getPostsFromMostPopularToLeast();

    @Query("SELECT p FROM Post p " +
            "WHERE p.user.id = :userId " +
            "ORDER BY p.createdAt DESC ")
    List<Post> findAllByUserId(@Param("userId") Long userId);

    // Query to get the like count for a post
    @Query("SELECT COUNT(l) FROM Like l WHERE l.post = :post AND l.isLike = true")
    long getLikeCount(@Param("post") Post post);

    // Query to get the dislike count for a post
    @Query("SELECT COUNT(l) FROM Like l WHERE l.post = :post AND l.isLike = false")
    long getDislikeCount(@Param("post") Post post);

    // Query to get the comment count for a post
    @Query("SELECT COUNT(c) FROM Comment c WHERE c.post = :post")
    long getCommentCount(@Param("post") Post post);

    // Query to get the number of user's posts
    @Query("SELECT COUNT(p) FROM Post p WHERE p.user.id = :userId")
    long getUserPostCount(@Param("userId") Long userId);

    // Query to get the total likes on user's posts
    @Query("SELECT COUNT(l) FROM Like l WHERE l.post.user.id = :userId AND l.isLike = true")
    long getTotalLikesOnUserPosts(@Param("userId") Long userId);

    // Query to get the total number of comments on user's posts
    @Query("SELECT COUNT(c) FROM Comment c WHERE c.post.user.id = :userId")
    long getTotalCommentsOnUserPosts(@Param("userId") Long userId);

    @Query("SELECT DISTINCT p FROM Post p JOIN FETCH p.tags t WHERE t IN :tags")
    List<Post> findAllByTags(@Param("tags") List<Tag> tags);
}
