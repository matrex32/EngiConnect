package com.engiconnect.converter;

import com.engiconnect.dto.JobDto;
import com.engiconnect.dto.UserDto;
import com.engiconnect.model.Job;
import com.engiconnect.model.User;
import com.engiconnect.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JobConverter {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserConverter userConverter;

	public JobDto entityToDto(Job job) {

		JobDto jobDto = new JobDto();
		jobDto.setId(job.getId());
		jobDto.setTitle(job.getTitle());
		jobDto.setDescription(job.getDescription());

		if (job.getUser() != null) {
			UserDto userDTO = userConverter.entityToDto(job.getUser());
			jobDto.setUser(userDTO);
		}

		jobDto.setCity(job.getCity());
		jobDto.setState(job.getState());
		jobDto.setEmploymentType(job.getEmploymentType());
		jobDto.setSalary(job.getSalary());
		jobDto.setVacancies(job.getVacancies());
		jobDto.setSeniorityLevel(job.getSeniorityLevel());
		jobDto.setCurrency(job.getCurrency());

		return jobDto;
	}

	public Job dtoToEntity(JobDto dto) {
		
		Job job = new Job();
		job.setId(dto.getId());
		job.setTitle(dto.getTitle());
		job.setDescription(dto.getDescription());

		User user = userRepository.findById(dto.getUserId())
				.orElseThrow(() -> new RuntimeException("User not found with id " + dto.getUserId()));
		job.setUser(user);

		job.setCity(dto.getCity());
		job.setState(dto.getState());
		job.setEmploymentType(dto.getEmploymentType());
		job.setSalary(dto.getSalary());
		job.setVacancies(dto.getVacancies());
		job.setSeniorityLevel(dto.getSeniorityLevel());
		job.setCurrency(dto.getCurrency());

		return job;
	}
}