package com.rut_mental_health_care.service.file;

import com.rut_mental_health_care.model.File;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface FileService {
    void save(MultipartFile file) throws IOException;
    Optional<File> getFile(String id);
    List<File> getAllFiles();
}
