package com.rut_mental_health_care.service.file;

import com.rut_mental_health_care.model.File;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    File uploadFile(MultipartFile multipartFile) throws IOException;
    File uploadDefaultProfilePicture() throws IOException;
    File findByUserId(Long userId);
    File deleteByUserId(Long userId) throws IOException;
}
