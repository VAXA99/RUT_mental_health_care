package com.rut_mental_health_care.service.article;

import com.rut_mental_health_care.model.Article;

public interface ArticleService {
    void writeArticle(Long userId, String title, String content);
    void editArticle(Long articleId, String title, String newContent);
    void deleteArticle(Long articleId);
}
