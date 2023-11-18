package com.rut_mental_health_care.service.article;

import com.rut_mental_health_care.entity.Article;

public interface ArticleService {
    void writeArticle(Article article);
    void editArticle(Long articleId, String newContent);
    void deleteArticle(Long articleId);
}
