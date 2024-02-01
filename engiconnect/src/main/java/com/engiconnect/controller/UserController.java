package com.engiconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.engiconnect.converter.UserConverter;
import com.engiconnect.dto.UserDto;
import com.engiconnect.model.User;
import com.engiconnect.service.UserService;
import com.engiconnect.service.ValidationService;

/**
 * The UserControllerclass is a REST controller that manages HTTP requests related to users.
 * This controller handles the registration of a new user into the system.
 * @author Denis
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

	/**
	 * UserService used for user-related operations.
	 */
	@Autowired
	private UserService userService;
	
	/**
     * ValidationService instance responsible for validating the incoming UserDto objects.
     */
	@Autowired
	private ValidationService validationService;
	
	/**
     * UserConverter instance responsible for converting between UserDto objects and User entities.
     */
	@Autowired
	private UserConverter userConverter;
	
	/**
     * Handles the POST request to register a new user.
     * 
     * @param newUser the user to be registered.
     * @return The data transfer object of the newly registered user if successful.
     */
	@PostMapping("/register")
	public UserDto registerUser(@RequestBody UserDto newUserDto) {
		
		validationService.validate(newUserDto);
		User newUser = userConverter.dtoToEntity(newUserDto);
		User registeredUser = userService.registerUser(newUser);
		
		return userConverter.entityToDto(registeredUser);
	}
}
