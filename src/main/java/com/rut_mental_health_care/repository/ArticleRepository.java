package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
