package com.engiconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.engiconnect.model.Job;
import com.engiconnect.model.User;

public interface JobRepository extends JpaRepository<Job, Integer> {

    List<Job> findByTitleContaining(String title);
    List<Job> findByDescriptionContaining(String description);
    public User findById(int id);
    List<Job> findAllByOrderByCreatedAtDesc();
}
