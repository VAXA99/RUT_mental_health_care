package com.rut_mental_health_care.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Boolean isEdited;
    private UserDto userDto;
    private Set<String> tagNames;
    private long likeCount;
    private long dislikeCount;
    private long commentCount;
}
