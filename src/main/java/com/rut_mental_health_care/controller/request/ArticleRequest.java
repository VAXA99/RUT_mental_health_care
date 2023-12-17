package com.rut_mental_health_care.controller.request;

import lombok.Data;

@Data
public class ArticleRequest {
    private Long userId;
    private String title;
    private String content;
}
