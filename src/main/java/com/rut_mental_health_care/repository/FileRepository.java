package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.model.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    Optional<File> findById(String id);

    @Query(nativeQuery = true, value = "SELECT f.* FROM files f JOIN users u ON u.photo_id = f.id WHERE u.id = :userId")
    Optional<File> findByUserId(@Param("userId") Long userId);

    @Query(nativeQuery = true, value = "SELECT f.* FROM files f JOIN article a ON a.article_picture_id = f.id WHERE a.id = :articleId")
    Optional<File> findByArticleId(@Param("articleId") Long articleId);

    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM files WHERE id IN (SELECT f.id FROM files f JOIN users u ON u.photo_id = f.id WHERE u.id = :userId)")
    void deleteByUserId(@Param("userId") Long userId);
}
