package com.engiconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.engiconnect.dto.JobDto;
import com.engiconnect.service.JobService;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping("/post-job")
    public ResponseEntity<JobDto> addJob(@RequestBody JobDto jobDto) {
        JobDto savedJob = jobService.addJob(jobDto);
        return ResponseEntity.ok(savedJob);
    }

    @GetMapping("/get-job")
    public ResponseEntity<List<JobDto>> getAllJobs() {
        List<JobDto> jobs = jobService.findAllJobs();
        return ResponseEntity.ok(jobs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Integer id) {
        JobDto jobDto = jobService.findJobById(id);
        if (jobDto != null) {
            jobService.deleteJob(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
