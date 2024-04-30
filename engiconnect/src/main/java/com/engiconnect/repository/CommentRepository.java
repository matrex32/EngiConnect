package com.engiconnect.repository;

import org.springframework.stereotype.Repository;
import com.engiconnect.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

	 List<Comment> findByPost_IdOrderByCreatedAtDesc(Integer postId);
}
