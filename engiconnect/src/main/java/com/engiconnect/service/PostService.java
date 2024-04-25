package com.engiconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.engiconnect.config.FileStorageConfig;
import com.engiconnect.converter.PostConverter;
import com.engiconnect.dto.PostDto;
import com.engiconnect.model.Post;
import com.engiconnect.model.User;
import com.engiconnect.repository.PostRepository;
import com.engiconnect.repository.UserRepository;
import com.engiconnect.utility.DateUtility;

import lombok.AllArgsConstructor;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PostService {
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private PostConverter postConverter;

	@Autowired
	private FileStorageConfig fileStorageConfig;
	
	@Autowired
	private UserRepository userRepository;
	
	public PostDto savePost( MultipartFile file, String content, String title, Integer userId) throws java.io.IOException {
		
		String fileName;
		Path uploadPath = Paths.get(fileStorageConfig.getFeedDir());
		
		if (!Files.exists(uploadPath)) {
	        Files.createDirectories(uploadPath);
	    }
		
		if( file == null) {
			fileName = null;
		}else {
			fileName = userId + "_" + file.getOriginalFilename();
			Path filePath = uploadPath.resolve(fileName);
			Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
		}
		 
		if(content.isBlank() || content.isEmpty()) {
			content = null;
		}
		
		User user = userRepository.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Post post = new Post();
        post.setContent(content);
        post.setImageUrl(fileName);
        post.setTitle(title);
        post.setUser(user);
        post.setCreatedAt(DateUtility.getCurrentUTCTimestamp());
        
        Post savedPost = postRepository.save(post);
        return postConverter.entityToDto(savedPost);
    }
	
	public List<PostDto> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(postConverter::entityToDto)
                .collect(Collectors.toList());
    }
}
