package com.engiconnect.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.engiconnect.dto.ApplicationDto;
import com.engiconnect.model.Application;
import com.engiconnect.model.Job;
import com.engiconnect.model.User;
import com.engiconnect.repository.JobRepository;
import com.engiconnect.repository.UserRepository;

@Component
public class ApplicationConverter {

	@Autowired
	private JobRepository jobRepository;

	@Autowired
	private UserConverter userConverter;

	@Autowired
	private JobConverter jobConverter;

	@Autowired
	private UserRepository userRepository;

	public ApplicationDto entityToDto(Application application) {

		ApplicationDto applicationDto = new ApplicationDto();

		applicationDto.setId(application.getId());
		applicationDto.setJobDto(jobConverter.entityToDto(application.getJob()));
		applicationDto.setUserDto(userConverter.entityToDto(application.getUser()));

		return applicationDto;
	}

	public Application dtoToEntity(ApplicationDto applicationDto) {

		Application entityApplication = new Application();

		User user = userRepository.findById(applicationDto.getUserId())
				.orElseThrow(() -> new RuntimeException("User not found with id " + applicationDto.getUserId()));
		
		entityApplication.setUser(user);
		
		Job job = jobRepository.findById(applicationDto.getJobId())
				.orElseThrow(() -> new RuntimeException("Job not found with id " + applicationDto.getJobId()));
		
		entityApplication.setJob(job);

		return entityApplication;
	}   
}
