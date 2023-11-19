package com.rut_mental_health_care.model;

import lombok.Data;

@Data
public class FileResponse {
    private String id;
    private String name;
    private Long size;
    private String url;
    private String contentType;
}
