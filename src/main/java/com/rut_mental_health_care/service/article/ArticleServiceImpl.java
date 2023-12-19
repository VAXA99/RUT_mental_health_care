package com.rut_mental_health_care.service.article;

import com.rut_mental_health_care.dto.ArticleDto;
import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.model.Article;
import com.rut_mental_health_care.model.File;
import com.rut_mental_health_care.model.Post;
import com.rut_mental_health_care.model.User;
import com.rut_mental_health_care.repository.ArticleRepository;
import com.rut_mental_health_care.repository.UserRepository;
import com.rut_mental_health_care.service.file.FileService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final FileService fileService;
    private final ModelMapper modelMapper;


    @Autowired
    public ArticleServiceImpl(ArticleRepository articleRepository,
                              UserRepository userRepository,
                              FileService fileService,
                              ModelMapper modelMapper) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.fileService = fileService;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ArticleDto> getAllArticles() {
        List<Article> articles = articleRepository.findAll();
        return getArticleDtos(articles);
    }

    @Override
    public ArticleDto getArticle(Long articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new EntityNotFoundException("Article not found with ID:" + articleId));

        return convertToArticleDTO(article);
    }

    @Override
    public Long writeArticle(Long userId, String title, String content) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));

        Article article = new Article();
        article.setTitle(title);
        article.setContent(content);
        article.setUser(user);

        articleRepository.save(article);

        return article.getId();
    }

    @Override
    @Async
    public void editArticle(Long articleId, String title,  String content) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new EntityNotFoundException("Article not found with ID:" + articleId));

        article.setTitle(title);
        article.setContent(content);

        articleRepository.save(article);
    }

    @Override
    @Async
    public void deleteArticle(Long articleId) {
        articleRepository.deleteById(articleId);
    }

    @Override
    @Transactional
    public File getArticlePicture(Long articleId) {
        return fileService.findByArticleId(articleId);
    }

    @Override
    public void uploadArticlePicture(Long articleId, MultipartFile file) throws IOException {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new EntityNotFoundException("Article not found with ID:" + articleId));

        article.setArticlePicture(fileService.uploadFile(file));

        articleRepository.save(article);
    }

    private ArticleDto convertToArticleDTO(Article article) {
        ArticleDto articleDto = modelMapper.map(article, ArticleDto.class);

        if (article.getUser() != null) {
            UserDto userDto = modelMapper.map(article.getUser(), UserDto.class);
            articleDto.setUserDto(userDto);
        }

        return articleDto;
    }

    private List<ArticleDto> getArticleDtos(List<Article> articles) {

        return articles.stream()
                .map(this::convertToArticleDTO)
                .collect(Collectors.toList());
    }
}

