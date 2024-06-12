package com.engiconnect.repository;

import com.engiconnect.model.Document;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Integer> {
	
	List<Document> findAllByOrderByUploadedAtDesc();
	
}