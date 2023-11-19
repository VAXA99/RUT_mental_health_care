package com.rut_mental_health_care.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private Long id;
    private UserDto userDto;
    private Boolean isEdited;
    private PostDto postDto;
    private CommentDto parentCommentDto;
    private String content;
    private LocalDateTime createdAt;
}
