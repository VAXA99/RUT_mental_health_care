package com.rut_mental_health_care.service.article;

import com.rut_mental_health_care.model.Article;
import com.rut_mental_health_care.model.User;
import com.rut_mental_health_care.repository.ArticleRepository;
import com.rut_mental_health_care.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;


    @Autowired
    public ArticleServiceImpl(ArticleRepository articleRepository,
                              UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Async
    public void writeArticle(Long userId, String title, String content) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));

        Article article = new Article();
        article.setTitle(title);
        article.setContent(content);
        article.setUser(user);

        articleRepository.save(article);
    }

    @Override
    @Async
    public void editArticle(Long articleId,String title,  String newContent) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new EntityNotFoundException("Article not found with ID:" + articleId));

        article.setTitle(title);
        article.setContent(newContent);
    }

    @Override
    @Async
    public void deleteArticle(Long articleId) {
        articleRepository.deleteById(articleId);
    }
}

