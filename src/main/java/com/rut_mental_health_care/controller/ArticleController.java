package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.model.Article;
import com.rut_mental_health_care.service.article.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin("http://localhost:3000/")
public class ArticleController {

    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping("/write")
    public ResponseEntity<String> writeArticle(@RequestBody Article article) {
        try {
            articleService.writeArticle(article);
            return ResponseEntity.status(HttpStatus.CREATED).body("Article created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating article");
        }
    }

    @PatchMapping("/edit/{articleId}")
    public ResponseEntity<String> editArticle(@PathVariable Long articleId, @RequestParam String newContent) {
        try {
            articleService.editArticle(articleId, newContent);
            return ResponseEntity.ok("Article edited successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error editing article");
        }
    }

    @DeleteMapping("/delete/{articleId}")
    public ResponseEntity<String> deleteArticle(@PathVariable Long articleId) {
        try {
            articleService.deleteArticle(articleId);
            return ResponseEntity.ok("Article deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting article");
        }
    }
}
