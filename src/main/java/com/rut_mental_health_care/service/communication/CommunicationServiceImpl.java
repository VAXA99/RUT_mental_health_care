package com.rut_mental_health_care.service.communication;


import com.rut_mental_health_care.dto.CommentDto;
import com.rut_mental_health_care.dto.PostDto;
import com.rut_mental_health_care.dto.UserDto;
import com.rut_mental_health_care.model.*;
import com.rut_mental_health_care.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
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
    public CommunicationServiceImpl(PostRepository postRepository,
                                    CommentRepository commentRepository,
                                    UserRepository userRepository,
                                    LikeRepository likeRepository,
                                    TagRepository tagRepository,
                                    ModelMapper modelMapper) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.tagRepository = tagRepository;
        this.modelMapper = modelMapper;
    }

    public enum FeedType {
        NEWEST_TO_OLDEST,
        MOST_POPULAR_TO_LEAST,
        BY_TAGS
    }

    public List<PostDto> getFeed(Long scrollingUserId, String strFeedType, List<String> tagNames) {
        FeedType feedType = FeedType.valueOf(strFeedType);
        List<Post> posts = switch (feedType) {
            case NEWEST_TO_OLDEST -> postRepository.getPostsFromNewestToOldest();
            case MOST_POPULAR_TO_LEAST -> postRepository.getPostsFromMostPopularToLeast();
            case BY_TAGS -> {
                List<Tag> tags = tagNames.stream()
                        .map(tagName -> tagRepository.findByDescription(tagName)
                                .orElseThrow(() -> new EntityNotFoundException("Tag not found with name: " + tagName)))
                        .collect(Collectors.toList());
                yield postRepository.findAllByTags(tags);
            }
            default -> throw new IllegalArgumentException("Unsupported feed type: " + feedType);
        };

        List<PostDto> postDtos = getPostDtos(posts);
        for (PostDto postDto : postDtos) {
            postDto.setScrollingUserHasLiked(likeRepository.existsByPostIdAndUserId(postDto.getId(), scrollingUserId));
        }

        return postDtos;
    }

    @Override
    public List<Tag> getAllAvailableTags() {
        return tagRepository.findAll();
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
    @Transactional
    public void likePost(Long postId, Long userId, Boolean isLike) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + postId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));

        // Find the existing like, if any
        Like existingLike = likeRepository.findByPostIdAndUserId(postId, userId);

        if (existingLike != null) {
            likeRepository.delete(existingLike);
/*            if (existingLike.getIsLike().equals(isLike)) {
                likeRepository.delete(existingLike);
            } else {
                existingLike.setIsLike(isLike);
            }*/
        } else {
            Like like = new Like();
            like.setUser(user);
            like.setPost(post);
            like.setIsLike(isLike);

            likeRepository.save(like);
        }

        postRepository.save(post);
    }

    @Override
    @Async
    @Transactional
    public void commentPost(Long postId, Long userId, String content) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + postId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setPost(post);
        comment.setIsEdited(false);
        comment.setContent(content);

        commentRepository.save(comment);
    }

    @Override
    @Async
    @Transactional
    public void replyToComment(Long parentCommentId, Long userId, String content) {
        Comment parentComment = commentRepository.findById(parentCommentId)
                .orElseThrow(() -> new EntityNotFoundException("Parent comment with ID " + parentCommentId + " not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));

        Comment reply = new Comment();
        reply.setParentComment(parentComment);
        reply.setUser(user);
        reply.setPost(parentComment.getPost());
        reply.setIsEdited(false);
        reply.setContent(content);
        commentRepository.save(reply);
    }

    @Override
    @Async
    @Transactional
    public void editComment(Long commentId, String newContent) {
         Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("Comment with ID " + commentId + " not found"));
        comment.setContent(newContent);
        comment.setIsEdited(true);
        commentRepository.save(comment);
    }

    @Override
    @Async
    @Transactional
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    @Async
    @Transactional
    public void writePost(Long userId, String title, String content, List<String> tagNames) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID:" + userId));

        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setUser(user);
        post.setIsEdited(false);

        List<Tag> tags = new ArrayList<>();
        for (String tagName : tagNames) {
            Tag tag = tagRepository.findByDescription(tagName).orElseGet(() -> {
                Tag newTag = new Tag();
                newTag.setDescription(tagName);
                return tagRepository.save(newTag);
            });
            tags.add(tag);
        }

        post.setTags(tags);

        postRepository.save(post);
    }

    @Override
    @Async
    @Transactional
    public void editPost(Long postId, String newTitle, String newContent) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + postId));

        post.setTitle(newTitle);
        post.setContent(newContent);
        post.setIsEdited(true);

        postRepository.save(post);
    }

    @Override
    @Async
    @Transactional
    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + postId));

        post.getTags().clear();

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

    private List<PostDto> getPostDtos(List<Post> posts) {
        List<PostDto> postDtos = posts.stream()
                .map(this::convertToPostDTO)
                .collect(Collectors.toList());
        for (PostDto postDto: postDtos) {
            List<String> tagNames = tagRepository.findTagsByPostId(postDto.getId());
            postDto.setTagNames(tagNames);
        }

        return postDtos;
    }
}
