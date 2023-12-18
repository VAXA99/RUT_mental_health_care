package com.rut_mental_health_care.service.article;

import com.rut_mental_health_care.dto.ArticleDto;
import com.rut_mental_health_care.model.Article;
import com.rut_mental_health_care.model.File;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ArticleService {
    List<ArticleDto> getAllArticles();

    void writeArticle(Long userId, String title, String content);

    void editArticle(Long articleId, String title, String newContent);

    void deleteArticle(Long articleId);

    File getArticlePicture(Long articleId);

    void uploadArticlePicture(Long articleId, MultipartFile file) throws IOException;
}
