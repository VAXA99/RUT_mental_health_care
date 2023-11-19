package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.model.Article;
import com.rut_mental_health_care.service.article.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping("/write")
    @PreAuthorize("hasRole('ROLE_PSYCHOLOGIST')")
    public void writeArticle(@RequestBody Article article) {
        articleService.writeArticle(article);
    }

    @PatchMapping("/edit/{articleId}")
    @PreAuthorize("hasRole('ROLE_PSYCHOLOGIST')")
    public void editArticle(@PathVariable Long articleId, @RequestParam String newContent) {
        articleService.editArticle(articleId, newContent);
    }

    @DeleteMapping("/delete/{articleId}")
    @PreAuthorize("hasRole('ROLE_PSYCHOLOGIST')")
    public void deleteArticle(@PathVariable Long articleId) {
        articleService.deleteArticle(articleId);
    }
}
