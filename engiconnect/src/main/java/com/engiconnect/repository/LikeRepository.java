package com.engiconnect.repository;

import com.engiconnect.model.Like;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Integer> {

	boolean existsByPostIdAndUserId(Integer postId, Integer userId);
	
	Optional <Like> findByPostIdAndUserId(Integer postId, Integer userId);

	int countByPostId(Integer postId);
}
