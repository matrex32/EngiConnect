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

    @PostMapping("/add-comment")
    public ResponseEntity<?> addComment(@RequestBody CommentDto commentDto) {
    	System.out.println("ADD COMMENT!!!");
        try {
            CommentDto comment = commentService.addComment(commentDto.getUserId(), commentDto.getPostId(), commentDto.getCommentText());
            return ResponseEntity.status(HttpStatus.CREATED).body(comment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @GetMapping("/get-comment")
    public List<CommentDto> getCommentsByPostId(@RequestParam("postId") Integer postId) {
    	System.out.println("GET COMMENT!!!");
        return commentService.getCommentsByPostId(postId);
    }
}
