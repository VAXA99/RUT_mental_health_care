package com.rut_mental_health_care.controller.request;

import lombok.Data;

import java.util.List;

@Data
public class FeedRequest {
    Long scrollingUserId;
    String feedType;
    List<String> tagNames;
}