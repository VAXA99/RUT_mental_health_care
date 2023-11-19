package com.rut_mental_health_care.service.article;

import com.rut_mental_health_care.model.Article;
import com.rut_mental_health_care.repository.ArticleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository articleRepository;


    @Autowired
    public ArticleServiceImpl(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Override
    @Async
    public void writeArticle(Article article) {
        articleRepository.save(article);
    }

    @Override
    @Async
    public void editArticle(Long articleId, String newContent) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new EntityNotFoundException("Article not found with ID:" + articleId));

        article.setContent(newContent);
    }

    @Override
    @Async
    public void deleteArticle(Long articleId) {
        articleRepository.deleteById(articleId);
    }
}

