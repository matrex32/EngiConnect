package com.engiconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.engiconnect.exception.EngiConnectException;
import com.engiconnect.exception.InternalErrorCode;
import com.engiconnect.message.Message;
import com.engiconnect.model.User;
import com.engiconnect.repository.UserRepository;
import com.engiconnect.utility.DateUtility;

import lombok.AllArgsConstructor;

/**
 *  Service class for user-related operations.
 *  
 *  @author Denis
 */
@Service
@AllArgsConstructor
public class UserService {

	/**
	 * Instance of UserRepository to interact with the database.
	 */
	@Autowired
	private UserRepository userRepository;
	
	public com.engiconnect.model.User registerUser(User newUser) {
		
		if(userRepository.existsByEmail(newUser.getEmail())) {
			throw new EngiConnectException(Message.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT, InternalErrorCode.EMAIL_ALREADY_EXISTS);
		}
		
		newUser.setPassword(newUser.getPassword());
		newUser.setRegistrationDate(DateUtility.getCurrentUTCTimestamp());
		
		newUser = userRepository.save(newUser);
		
		return newUser;
		
	}
	
}
