package com.rut_mental_health_care.controller.request;

import lombok.Data;

@Data
public class CommentRequest {
    private Long userId;
    private String content;
}
