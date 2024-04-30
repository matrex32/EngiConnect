package com.engiconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.engiconnect.dto.LikeDto;
import com.engiconnect.model.Like;
import com.engiconnect.repository.LikeRepository;
import com.engiconnect.repository.PostRepository;
import com.engiconnect.repository.UserRepository;


@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public LikeDto addLike(Integer userId, Integer postId) {
        if (likeRepository.existsByPostIdAndUserId(postId, userId)) {
            throw new IllegalStateException("User already liked this post");
        }
        Like like = new Like();
        like.setUser(userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found")));
        like.setPost(postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found")));
        likeRepository.save(like);

        int totalLikes = likeRepository.countByPostId(postId);
        boolean isLikedByUser = true;

        return new LikeDto(userId, postId, like, totalLikes, isLikedByUser);
    }


    public LikeDto removeLike(Integer userId, Integer postId) {
        Like like = likeRepository.findByPostIdAndUserId(postId, userId)
                .orElseThrow(() -> new IllegalStateException("Like not found"));
        likeRepository.delete(like);
        
        int totalLikes = likeRepository.countByPostId(postId);
        boolean isLikedByUser = false;

        return new LikeDto(userId, postId, null, totalLikes, isLikedByUser);
    }

}
