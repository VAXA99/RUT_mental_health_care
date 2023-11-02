package com.rut_mental_health_care.service.post;


import com.rut_mental_health_care.dto.CommentDto;
import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.entity.Comment;
import com.rut_mental_health_care.entity.Like;
import com.rut_mental_health_care.entity.Post;
import com.rut_mental_health_care.entity.User;
import com.rut_mental_health_care.repository.CommentRepository;
import com.rut_mental_health_care.repository.LikeRepository;
import com.rut_mental_health_care.repository.PostRepository;
import com.rut_mental_health_care.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;
    private CommentRepository commentRepository;
    private UserRepository userRepository;
    private LikeRepository likeRepository;
    private ModelMapper modelMapper;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, CommentRepository commentRepository, UserRepository userRepository,LikeRepository likeRepository, ModelMapper modelMapper) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<PostDto> getFeed() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(this::convertToPostDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentDto> getComments(Long postId) {
        List<Comment> comments = commentRepository.findCommentByPostId(postId);
        return comments.stream()
                .map(this::convertToCommentDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Async
    public void likePost(Long postId, String username, Boolean isLike) {
        Optional<Post> postOptional = postRepository.findById(postId);
        Post post = postOptional.orElseThrow(() -> new IllegalArgumentException("Post not found with ID: " + postId));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));

        // Perform like operation
        // For example, you can create a Like entity and save it
        Like like = new Like();
        like.setUser(user);
        like.setPost(post);
        like.setIsLike(isLike);
        // Save the like entity
        likeRepository.save(like);

        // Save post
        // postRepository.save(post);
    }

    @Override
    @Async
    public void commentPost(Long postId, CommentDto commentDto) {
        Optional<Post> postOptional = postRepository.findById(postId);
        Post post = postOptional.orElseThrow(() -> new IllegalArgumentException("Post not found with ID: " + postId));

        Comment comment = modelMapper.map(commentDto, Comment.class);

        comment.setPost(post);

        commentRepository.save(comment);
    }

    @Override
    @Async
    public void writePost(PostDto postDto) {
        Post post = modelMapper.map(postDto, Post.class);
        postRepository.save(post);
    }

    @Override
    @Async
    public void editPost(Long postId, String newContent) {
        Optional<Post> postOptional = postRepository.findById(postId);
        Post post = postOptional.orElseThrow(() -> new IllegalArgumentException("Post not found with ID: " + postId));

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
        return postDto;
    }

    private CommentDto convertToCommentDTO(Comment comment) {
        CommentDto commentDto = modelMapper.map(comment, CommentDto.class);
        if (comment.getUser() != null) {
            UserDto userDto = modelMapper.map(comment.getUser(), UserDto.class);
            commentDto.setUserDto(userDto);
        }
        return commentDto;
    }
}
