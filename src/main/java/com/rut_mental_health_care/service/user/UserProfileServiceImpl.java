package com.rut_mental_health_care.service.user;

import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.dto.UserProfileDto;
import com.rut_mental_health_care.entity.Post;
import com.rut_mental_health_care.entity.User;
import com.rut_mental_health_care.repository.PostRepository;
import com.rut_mental_health_care.repository.TagRepository;
import com.rut_mental_health_care.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserProfileServiceImpl(PostRepository postRepository, UserRepository userRepository, TagRepository tagRepository, ModelMapper modelMapper) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
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
    public List<PostDto> getUserPosts(Long userId) {
        List<Post> posts = postRepository.findAllByUserId(userId);
        List<PostDto> postDtos = posts.stream()
                .map(this::convertToPostDTO)
                .collect(Collectors.toList());
        for (PostDto postDto: postDtos) {
            List<String> tagNames = tagRepository.findTagsByPostId(postDto.getId());
            postDto.setTagNames(tagNames);
        }

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
        List<PostDto> postDtos= getUserPosts(userId);
        long totalPosts = getUserPostCount(userId);
        long totalComments = getTotalCommentsOnUserPosts(userId);
        long totalLikes = getTotalLikesOnUserPosts(userId);

        return new UserProfileDto(username, roles, name, surname, middleName, email, bio, postDtos, totalPosts, totalComments, totalLikes);
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
