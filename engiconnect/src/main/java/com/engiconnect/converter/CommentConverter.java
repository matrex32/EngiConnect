package com.engiconnect.converter;

import com.engiconnect.dto.CommentDto;
import com.engiconnect.model.Comment;
import com.engiconnect.model.User;
import com.engiconnect.model.Post;
import com.engiconnect.repository.UserRepository;
import com.engiconnect.repository.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentConverter {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private UserConverter userConverter;
	
	public CommentDto entityToDto(Comment comment) {
		
	    CommentDto commentDto = new CommentDto();
	    commentDto.setCommentId(comment.getCommentId());
	    commentDto.setCommentText(comment.getCommentText());
	    commentDto.setPostId(comment.getPost().getId());
	    commentDto.setUserId(comment.getUser().getId());
	    commentDto.setUserDto(userConverter.entityToDto(comment.getUser()));
	    return commentDto;
	}

	public Comment dtoToEntity(CommentDto dto) {
		
	    Comment entityComment = new Comment();
	    entityComment.setCommentText(dto.getCommentText());

	    User user = userRepository.findById(dto.getUserId())
	        .orElseThrow(() -> new RuntimeException("User not found with id " + dto.getUserId()));
	    entityComment.setUser(user);

	    Post post = postRepository.findById(dto.getPostId())
	        .orElseThrow(() -> new RuntimeException("Post not found with id " + dto.getPostId()));
	    entityComment.setPost(post);

	    return entityComment;
	}   
}
