package com.engiconnect.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.engiconnect.dto.PostDto;
import com.engiconnect.model.Post;
import com.engiconnect.model.User;
import com.engiconnect.repository.UserRepository;

@Component
public class PostConverter {

	@Autowired
	private UserRepository userRepository;
	
    private UserConverter userConverter;

    @Autowired
    public PostConverter(UserConverter userConverter, UserRepository userRepository) {
        this.userConverter = userConverter;
        this.userRepository = userRepository;
    }

    /**
     * Converts a {@link Post} object to a {@link PostDto} object.
     *
     * @param post the Post object to be converted.
     * @return the corresponding PostDto object with post details and user information.
     */
    public PostDto entityToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setTitle(post.getTitle());
        
        postDto.setPostId(post.getPostId());
        
        if (post.getImageUrl() == null || post.getImageUrl().trim().isEmpty()) {
            postDto.setImageUrl(null);
        } else {
        	String baseUrl = "http://localhost:8080"; 
	        String fullImageUrl = baseUrl + "/uploads/" + post.getImageUrl();
        	postDto.setImageUrl(fullImageUrl);
        }
        
        if (post.getContent() == null || post.getContent().trim().isEmpty()) {
            postDto.setContent(null);
        } else {
        	postDto.setContent(post.getContent());
        }
        
        postDto.setUser(userConverter.entityToDto(post.getUser()));

        return postDto;
    }

    public Post dtoToEntity(PostDto postDto) {
        Post post = new Post();
        
        post.setTitle(postDto.getTitle());
        
        if(postDto.getContent() == null || postDto.getContent().trim().isEmpty()) {
        	post.setContent(null);
        } else {
        	post.setContent(postDto.getContent());
        }
        
        if(postDto.getImageUrl() == null || postDto.getImageUrl().trim().isEmpty()) {
        	post.setImageUrl(null);
        } else {
        	post.setImageUrl(postDto.getImageUrl());
        }

        if (postDto.getUser() != null && postDto.getUser().getId() != null) {
        	
            Integer userId = postDto.getUser().getId();
            User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found with id " + userId));
            post.setUser(user);
        }

        return post;
    }
}
