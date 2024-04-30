package com.engiconnect.controller;

import com.engiconnect.dto.LikeDto;
import com.engiconnect.repository.LikeRepository;
import com.engiconnect.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

	@Autowired
	private LikeRepository likeRepository;
	
    @Autowired
    private LikeService likeService;

    @PostMapping("/add-like")
    public ResponseEntity<?> addLike(@RequestBody LikeDto likeDto) {
    	System.out.println("ADD!!!");
        try {
            LikeDto likeResponse = likeService.addLike(likeDto.getUserId(), likeDto.getPostId());
            return ResponseEntity.ok(likeResponse);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete-like")
    public ResponseEntity<?> removeLike(@RequestParam("userId") Integer userId, @RequestParam("postId") Integer postId) {
    	System.out.println("DELETE!!!");
        try {
            LikeDto likeResponse = likeService.removeLike(userId, postId);
            return ResponseEntity.ok(likeResponse);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    
    @GetMapping("/check")
    public ResponseEntity<Boolean> checkLike(@RequestParam("userId") Integer userId, @RequestParam("postId") Integer postId) {
    	System.out.println("CHECK!!!");
        boolean exists = likeRepository.existsByPostIdAndUserId(postId, userId);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/count")
    public ResponseEntity<?> getLikesCount(@RequestParam("postId") Integer postId) {
        int count = likeRepository.countByPostId(postId);
        return ResponseEntity.ok(count);
    }

}
