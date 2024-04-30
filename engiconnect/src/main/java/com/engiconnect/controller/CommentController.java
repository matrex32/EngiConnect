package com.engiconnect.controller;

import com.engiconnect.dto.CommentDto;
import com.engiconnect.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<?> addComment(@RequestParam("userId") Integer userId, @RequestParam("postId") Integer postId, @RequestParam("commentText") String commentText) {
        try {
            CommentDto comment = commentService.addComment(userId, postId, commentText);
            return ResponseEntity.status(HttpStatus.CREATED).body(comment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public List<CommentDto> getCommentsByPostId(@RequestParam("postId") Integer postId) {
        return commentService.getCommentsByPostId(postId);
    }
}
