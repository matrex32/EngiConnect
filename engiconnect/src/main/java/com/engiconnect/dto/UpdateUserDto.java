package com.engiconnect.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a Data Transfer Object for updating the user's name.
 * @author Denis
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDto {
	
	/**
	 * The new name for the user
	 */
	@NotBlank
	private String name;
	
	private String aboutMe;
	
	private String phoneNumber;
	
	private String userCity;
	
	private String university;
	
	private String userFaculty;
	
	private String yearOfStudy;
}
