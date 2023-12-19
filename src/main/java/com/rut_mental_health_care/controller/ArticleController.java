package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.controller.request.ArticleRequest;
import com.rut_mental_health_care.dto.ArticleDto;
import com.rut_mental_health_care.model.File;
import com.rut_mental_health_care.service.article.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin("http://localhost:3000/")
public class ArticleController {

    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ResponseEntity<?> getAllArticles() {
        try {
            List<ArticleDto> articleDtos =  articleService.getAllArticles();
            return ResponseEntity.ok(articleDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching articles");
        }
    }

    @PostMapping("/write")
    @PreAuthorize("hasRole('ROLE_PSYCHOLOGIST')")
    public ResponseEntity<String> writeArticle(@RequestBody ArticleRequest articleRequest) {
        try {
            articleService.writeArticle(articleRequest.getUserId(),
                    articleRequest.getTitle(),
                    articleRequest.getContent());
            return ResponseEntity.status(HttpStatus.CREATED).body("Article created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating article");
        }
    }

    @PatchMapping("/edit/{articleId}")
    @PreAuthorize("hasRole('ROLE_PSYCHOLOGIST')")
    public ResponseEntity<String> editArticle(@PathVariable Long articleId, @RequestBody ArticleRequest articleRequest) {
        try {
            articleService.editArticle(articleId,
                    articleRequest.getTitle(),
                    articleRequest.getContent());
            return ResponseEntity.ok("Article edited successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error editing article");
        }
    }

    @DeleteMapping("/delete/{articleId}")
    @PreAuthorize("hasRole('ROLE_PSYCHOLOGIST')")
    public ResponseEntity<String> deleteArticle(@PathVariable Long articleId) {
        try {
            articleService.deleteArticle(articleId);
            return ResponseEntity.ok("Article deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting article");
        }
    }

    @GetMapping("articlePicture/{articleId}")
    public ResponseEntity<byte[]> getArticlePicture(@PathVariable Long articleId) {
        File file = articleService.getArticlePicture(articleId);

        if (file == null) {
            return ResponseEntity.notFound()
                    .build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .contentType(MediaType.valueOf(file.getContentType()))
                .body(file.getData());
    }

    @PostMapping("/uploadArticlePicture/{articleId}")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable Long articleId, @RequestParam("file") MultipartFile file) {
        try {
            articleService.uploadArticlePicture(articleId, file);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(String.format("File uploaded successfully: %s", file.getOriginalFilename()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(String.format("Could not upload the file: %s!", file.getOriginalFilename()));
        }
    }
}
