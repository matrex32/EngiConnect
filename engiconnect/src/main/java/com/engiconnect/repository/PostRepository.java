package com.engiconnect.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

import com.engiconnect.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

	List<Post> findByUserIdOrderByCreatedAtDesc(Integer userId);
	
	Page<Post> findAll(org.springframework.data.domain.Pageable pageable);
	
	List<Post> findAllByOrderByCreatedAtDesc();
}
