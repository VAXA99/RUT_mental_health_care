package com.rut_mental_health_care.service.comment;

import com.rut_mental_health_care.dto.CommentDto;
import com.rut_mental_health_care.entity.Comment;
import com.rut_mental_health_care.entity.Post;
import com.rut_mental_health_care.repository.CommentRepository;
import com.rut_mental_health_care.repository.PostRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;
    private PostRepository postRepository;
    private ModelMapper modelMapper;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, PostRepository postRepository, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    @Async
    public void writeComment(CommentDto commentDto, Long postId) {
        Comment comment = modelMapper.map(commentDto, Comment.class);
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post with ID " + postId + " not found"));
        comment.setPost(post);
        commentRepository.save(comment);
    }

    @Override
    @Async
    public void replyToComment(Long parentCommentId, CommentDto replyDto) {
        Comment parentComment = commentRepository.findById(parentCommentId)
                .orElseThrow(() -> new IllegalArgumentException("Parent comment with ID " + parentCommentId + " not found"));
        Comment reply = modelMapper.map(replyDto, Comment.class);
        reply.setParentComment(parentComment);
        commentRepository.save(reply);
    }

    @Override
    @Async
    public void editComment(Long commentId, String newContent) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment with ID " + commentId + " not found"));
        comment.setContent(newContent);
        comment.setIsEdited(true);
        commentRepository.save(comment);
    }

    @Override
    @Async
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
