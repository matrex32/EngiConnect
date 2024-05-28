package com.engiconnect.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.engiconnect.dto.JobDto;
import com.engiconnect.model.Job;
import com.engiconnect.converter.JobConverter;
import com.engiconnect.repository.JobRepository;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobConverter jobConverter;
    
    @Transactional
    public JobDto addJob(JobDto jobDto) {
        Job job = jobConverter.dtoToEntity(jobDto);
        Job savedJob = jobRepository.save(job);
        return jobConverter.entityToDto(savedJob);
    }

    public List<JobDto> findAllJobs() {
        return jobRepository.findAllByOrderByCreatedAtDesc() 
                            .stream()
                            .map(jobConverter::entityToDto)
                            .collect(Collectors.toList());
    }

    @Transactional
    public void deleteJob(Integer id) {
        jobRepository.deleteById(id);
    }

    public JobDto findJobById(Integer id) {
        return jobRepository.findById(id)
                            .map(jobConverter::entityToDto) 
                            .orElse(null);
    }
}
