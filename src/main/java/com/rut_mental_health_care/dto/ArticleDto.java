package com.rut_mental_health_care.dto;

import lombok.Data;

@Data
public class ArticleDto {
    private Long id;
    private String title;
    private String content;
    private UserDto userDto;
}
