package com.engiconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.engiconnect.converter.ApplicationConverter;
import com.engiconnect.dto.ApplicationDto;
import com.engiconnect.events.ApplicationEventJob;
import com.engiconnect.model.Application;
import com.engiconnect.service.ApplicationService;
import org.springframework.context.ApplicationEventPublisher;

/**
 * JobController manages job-related actions such as applying for a job.
 */
@RestController
@RequestMapping("/api/jobs")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private ApplicationEventPublisher eventPublisher;
    
    @Autowired
    private ApplicationConverter applicationConverter;

    /**
     * Endpoint to handle job applications.
     * 
     * @param applicationDto The DTO containing job application data.
     * @return ResponseEntity containing the applied job or an error message.
     */
    @PostMapping("/apply")
    public ResponseEntity<ApplicationDto> applyForJob(@RequestBody ApplicationDto applicationDto) {
        try {
            Application application = applicationService.applyForJob(applicationDto);
            ApplicationDto savedApplicationDto = applicationConverter.entityToDto(application);
            eventPublisher.publishEvent(new ApplicationEventJob(this, application));
            return ResponseEntity.ok(savedApplicationDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); 
        }
    }
}
