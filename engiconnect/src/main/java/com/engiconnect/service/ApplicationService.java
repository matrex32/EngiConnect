package com.engiconnect.service;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.engiconnect.converter.ApplicationConverter;
import com.engiconnect.dto.ApplicationDto;
import com.engiconnect.events.ApplicationEventJob;
import com.engiconnect.model.Application;
import com.engiconnect.repository.ApplicationRepository;

@Service
public class ApplicationService {

	    @Autowired
	    private ApplicationRepository applicationRepository;
	    
	    @Autowired
	    private ApplicationEventPublisher eventPublisher;
	    
	    @Autowired
	    private ApplicationConverter applicationConverter;

	    public Application applyForJob(ApplicationDto applicationDto) {
	    	
	        Application application = applicationConverter.dtoToEntity(applicationDto);
	        application.setAppliedAt(new Timestamp(System.currentTimeMillis()));
	        Application savedApplication = applicationRepository.save(application);
	        eventPublisher.publishEvent(new ApplicationEventJob(this, savedApplication));
	        
	        return savedApplication;
	    }
	}
