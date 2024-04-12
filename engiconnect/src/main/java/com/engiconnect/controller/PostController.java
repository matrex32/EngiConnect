package com.engiconnect.controller;

import com.engiconnect.dto.PostDto;
import com.engiconnect.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/upload")
    public PostDto uploadPost(@RequestParam(value = "file", required = false) MultipartFile file,
                              @RequestParam(value = "content", required = false) String content,
                              @RequestParam(value = "title") String title,
                              @RequestParam("userId") Integer userId) throws IOException {
        if (file == null && (content == null || content.trim().isEmpty())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Either file or content must be provided.");
        }
        return postService.savePost(file, content,title, userId);
    }


    @GetMapping
    public List<PostDto> getAllPosts() {
        return postService.getAllPosts();
    }
}
