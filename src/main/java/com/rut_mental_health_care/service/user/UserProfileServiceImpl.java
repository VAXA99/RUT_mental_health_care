package com.rut_mental_health_care.service.user;

import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.dto.UserProfileDto;
import com.rut_mental_health_care.model.File;
import com.rut_mental_health_care.model.Post;
import com.rut_mental_health_care.model.User;
import com.rut_mental_health_care.repository.FileRepository;
import com.rut_mental_health_care.repository.PostRepository;
import com.rut_mental_health_care.repository.TagRepository;
import com.rut_mental_health_care.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final FileRepository fileRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserProfileServiceImpl(PostRepository postRepository,
                                  UserRepository userRepository,
                                  TagRepository tagRepository,
                                  FileRepository fileRepository,
                                  ModelMapper modelMapper) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
        this.fileRepository = fileRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public String getUserUsername(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getUsername();
    }

    @Override
    public String getUserRoles(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getRoles();
    }

    @Override
    public String getUserName(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getName();
    }

    @Override
    public String getUserSurname(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getSurname();
    }

    @Override
    public String getUserMiddleName(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getMiddleName();
    }

    @Override
    public String getUserEmail(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getEmail();
    }

    @Override
    public String getUserBio(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        return user.getInformation();
    }

    @Override
    @Transactional
    public int getUserAge(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));

        return userRepository.countUserAge(user.getDateOfBirth());
    }

    @Override
    @Transactional
    public File getProfilePicture(Long userId) {

        return fileRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("File not found for user with ID:" + userId));

    }

    @Override
    public List<PostDto> getUserPosts(Long userId) {
        List<Post> posts = postRepository.findAllByUserId(userId);
        List<PostDto> postDtos = posts.stream()
                .map(post -> {
                    PostDto postDto = convertToPostDTO(post);
                    List<String> tagNames = tagRepository.findTagsByPostId(postDto.getId());
                    postDto.setTagNames(tagNames);
                    return postDto;
                })
                .collect(Collectors.toList());

        return postDtos;
    }


    @Override
    public long getUserPostCount(Long userId) {
        return postRepository.getUserPostCount(userId);
    }

    @Override
    public long getTotalLikesOnUserPosts(Long userId) {
        return postRepository.getTotalLikesOnUserPosts(userId);
    }

    @Override
    public long getTotalCommentsOnUserPosts(Long userId) {
        return postRepository.getTotalCommentsOnUserPosts(userId);
    }

    @Override
    public UserProfileDto getUserProfile(Long userId) {

        String username = getUserUsername(userId);
        String roles = getUserRoles(userId);
        String name = getUserName(userId);
        String surname = getUserSurname(userId);
        String middleName = getUserMiddleName(userId);
        String email = getUserEmail(userId);
        String bio = getUserBio(userId);
        int age = getUserAge(userId);
        File profilePicture = getProfilePicture(userId);
        List<PostDto> postDtos= getUserPosts(userId);
        long totalPosts = getUserPostCount(userId);
        long totalComments = getTotalCommentsOnUserPosts(userId);
        long totalLikes = getTotalLikesOnUserPosts(userId);

        return new UserProfileDto(username, roles, name, surname, middleName, email, bio, age, profilePicture, postDtos, totalPosts, totalComments, totalLikes);
    }

    @Override
    public List<UserProfileDto> getPsychologistsProfile() {
        List<User> psychologists = userRepository.findAllByRoles("ROLE_PSYCHOLOGIST");

        return psychologists.stream()
                .map(user -> new UserProfileDto(
                        user.getName(),
                        user.getSurname(),
                        user.getMiddleName(),
                        user.getInformation()
                ))
                .collect(Collectors.toList());
    }

    @Override
    @Async
    public void editUsername(Long userId, String newUsername) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        user.setUsername(newUsername);
        userRepository.save(user);
    }

    @Override
    @Async
    public void editName(Long userId, String newName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        user.setName(newName);
        userRepository.save(user);
    }

    @Override
    @Async
    public void editSurname(Long userId, String newSurname) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        user.setSurname(newSurname);
        userRepository.save(user);
    }

    @Override
    @Async
    public void editMiddleName(Long userId, String newMiddleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        user.setMiddleName(newMiddleName);
        userRepository.save(user);
    }

    @Override
    @Async
    public void editEmail(Long userId, String newEmail) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        user.setEmail(newEmail);
        userRepository.save(user);
    }

    @Override
    @Async
    public void editBio(Long userId, String newBio) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        user.setInformation(newBio);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void setUserDateOfBirth(Long userId, Date dateOfBirth) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        user.setDateOfBirth(dateOfBirth);
    }

    @Override
    @Async
    @Transactional
    public void uploadProfilePicture(Long userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));

        File fileEntity = new File();
        fileEntity.setName(StringUtils.cleanPath(file.getOriginalFilename()));
        fileEntity.setContentType(file.getContentType());
        fileEntity.setData(file.getBytes());
        fileEntity.setSize(file.getSize());

        user.setProfilePicture(fileEntity);

        fileRepository.save(fileEntity);
    }

    @Override
    @Async
    @Transactional
    public void deleteProfilePicture(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));
        user.setProfilePicture(null);
        fileRepository.deleteByUserId(userId);
    }


    private PostDto convertToPostDTO(Post post) {
        PostDto postDto = modelMapper.map(post, PostDto.class);
        if (post.getUser() != null) {
            UserDto userDto = modelMapper.map(post.getUser(), UserDto.class);
            postDto.setUserDto(userDto);
        }
        postDto.setLikeCount(postRepository.getLikeCount(post));
        postDto.setDislikeCount(postRepository.getDislikeCount(post));
        postDto.setCommentCount(postRepository.getCommentCount(post));

        return postDto;
    }

}
