package com.engiconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.engiconnect.dto.CommentDto;
import com.engiconnect.model.Comment;
import com.engiconnect.repository.CommentRepository;
import com.engiconnect.repository.PostRepository;
import com.engiconnect.repository.UserRepository;
import com.engiconnect.converter.CommentConverter;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentConverter commentConverter;

    public CommentDto addComment(Integer userId, Integer postId, String commentText) {
        Comment comment = new Comment();
        comment.setUser(userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found")));
        comment.setPost(postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found")));
        comment.setCommentText(commentText);
        Comment savedComment = commentRepository.save(comment);
        return commentConverter.entityToDto(savedComment);
    }

    public List<CommentDto> getCommentsByPostId(Integer postId) {
        List<Comment> comments = commentRepository.findByPost_IdOrderByCreatedAtDesc(postId);
        return comments.stream().map(commentConverter::entityToDto).collect(Collectors.toList());
    }
}
