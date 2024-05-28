package com.engiconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.engiconnect.model.Application;

public interface ApplicationRepository extends JpaRepository<Application, Integer>  {

    List<Application> findByUserId(Integer userId);
    List<Application> findByJobId(Integer jobId);
}
