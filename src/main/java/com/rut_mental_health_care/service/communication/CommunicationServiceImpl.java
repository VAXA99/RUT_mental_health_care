package com.rut_mental_health_care.service.communication;


import com.rut_mental_health_care.dto.CommentDto;
import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.entity.*;
import com.rut_mental_health_care.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CommunicationServiceImpl implements CommunicationService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final TagRepository tagRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CommunicationServiceImpl(PostRepository postRepository, CommentRepository commentRepository, UserRepository userRepository, LikeRepository likeRepository, TagRepository tagRepository, ModelMapper modelMapper) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.tagRepository = tagRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<PostDto> getFeed() {
        List<Post> posts = postRepository.findAll();
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
    public PostDto getPostWithComments(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + postId));

        List<Comment> comments = commentRepository.findCommentByPostId(postId);

        PostDto postDto = convertToPostDTO(post);
        List<CommentDto> commentDtos = comments.stream()
                .map(this::convertToCommentDTO)
                .collect(Collectors.toList());

        postDto.setCommentDtos(commentDtos);


        return postDto;
    }

    @Override
    @Async
    public void likePost(Long postId, String username, Boolean isLike) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + postId));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));

        // Find the existing like, if any
        Like existingLike = likeRepository.findByPostIdAndUserUsername(postId, username);

        if (existingLike != null) {

            if (existingLike.getIsLike().equals(isLike)) {
                likeRepository.delete(existingLike);
            } else {
                existingLike.setIsLike(isLike);
            }
        } else {
            // If no existing like is found, create a new Like entity and save it
            Like like = new Like();
            like.setUser(user);
            like.setPost(post);
            like.setIsLike(isLike);
            // Save the like entity
            likeRepository.save(like);
        }

        postRepository.save(post);
    }

    @Override
    @Async
    public void commentPost(Long postId, CommentDto commentDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + postId));

        Comment comment = modelMapper.map(commentDto, Comment.class);
        comment.setPost(post);

        commentRepository.save(comment);
    }

    @Override
    @Async
    public void replyToComment(Long parentCommentId, CommentDto replyDto) {
        Comment parentComment = commentRepository.findById(parentCommentId)
                .orElseThrow(() -> new EntityNotFoundException("Parent comment with ID " + parentCommentId + " not found"));
        Comment reply = modelMapper.map(replyDto, Comment.class);
        reply.setParentComment(parentComment);
        commentRepository.save(reply);
    }

    @Override
    @Async
    public void editComment(Long commentId, String newContent) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("Comment with ID " + commentId + " not found"));
        comment.setContent(newContent);
        comment.setIsEdited(true);
        commentRepository.save(comment);
    }

    @Override
    @Async
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    @Async
    public void writePost(PostDto postDto) {
        Post post = modelMapper.map(postDto, Post.class);

        List<Tag> tags = new ArrayList<>();
        for (String tagName : postDto.getTagNames()) {
            Tag tag = tagRepository.findByDescription(tagName).orElseGet(() -> {
                Tag newTag = new Tag();
                newTag.setDescription(tagName);
                return tagRepository.save(newTag);
            });
            tags.add(tag);
        }

        // Add the tags to the post and save the relationship in the post_tags table
        post.setTags(tags);
        postRepository.save(post);
    }


    @Override
    @Async
    public void editPost(Long postId, String newContent) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + postId));

        post.setContent(newContent);
        post.setIsEdited(true);

        postRepository.save(post);
    }

    @Override
    @Async
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
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

    public CommentDto convertToCommentDTO(Comment comment) {
        CommentDto commentDto = modelMapper.map(comment, CommentDto.class);
        if (comment.getUser() != null) {
            UserDto userDto = modelMapper.map(comment.getUser(), UserDto.class);
            commentDto.setUserDto(userDto);
        }
        commentDto.setId(comment.getId());
        commentDto.setIsEdited(comment.getIsEdited());
        commentDto.setContent(comment.getContent());
        commentDto.setCreatedAt(comment.getCreatedAt());

        // Set the postDto based on the relationships in Comment
        commentDto.setPostDto(convertToPostDTO(comment.getPost()));

        // Check if there is a parent comment and avoid infinite recursion
        if (comment.getParentComment() != null) {
            commentDto.setParentCommentDto(convertToCommentDTO(comment.getParentComment()));
        }

        return commentDto;
    }


}
