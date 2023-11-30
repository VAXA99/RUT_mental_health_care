package com.rut_mental_health_care.service.file;

import com.rut_mental_health_care.model.File;
import com.rut_mental_health_care.repository.FileRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;

    @Autowired
    public FileServiceImpl(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @Override
    public File uploadFile(MultipartFile file) throws IOException {
        File fileEntity = new File();
        fileEntity.setName(StringUtils.cleanPath(file.getOriginalFilename()));
        fileEntity.setContentType(file.getContentType());
        fileEntity.setData(file.getBytes());
        fileEntity.setSize(file.getSize());

        fileRepository.save(fileEntity);

        return fileEntity;
    }

    private byte[] readImageAsBytes(String imagePath) throws IOException {
        Resource resource = new ClassPathResource("images/" + imagePath);
        Path path = resource.getFile().toPath();
        return Files.readAllBytes(path);
    }

    @Override
    public File uploadDefaultProfilePicture() throws IOException {
        File file = new File();
        file.setName("default_profile_photo.jpg");
        file.setContentType("image/jpeg");
        String imagePath = "default_profile_photo.jpg";
        byte[] imageData = readImageAsBytes(imagePath);

        file.setData(imageData);
        file.setSize((long) imageData.length);

        return fileRepository.save(file);
    }

    @Override
    public File findByUserId(Long userId) {
        return fileRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("File not found for user with ID:" + userId));
    }

    @Override
    public File deleteByUserId(Long userId) throws IOException {
        fileRepository.deleteByUserId(userId);

        return uploadDefaultProfilePicture();
    }
}
