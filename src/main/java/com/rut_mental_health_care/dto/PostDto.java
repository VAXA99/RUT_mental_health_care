package com.rut_mental_health_care.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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
    private List<String> tagNames;
    private List<CommentDto> commentDtos;
    private long likeCount;
    private long dislikeCount;
    private long commentCount;
    private boolean scrollingUserHasLiked;
}