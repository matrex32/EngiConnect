package com.engiconnect.exception;

import org.springframework.http.HttpStatus;

import com.engiconnect.message.Message;

/**
 * This exception is thrown when a user is not authenticated in the system.
 * @author Denis
 *
 */
public class UserNotAuthenticatedException extends EngiConnectException {
	
	/**
	 * Unique ID used in serialization to verify that the sender and receiver of a serialized object maintain compatibility.
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Constructs a new UserNotAuthenticatedException with the provided message.
	 * 
	 * @param message The error message associated with this exception.
	 */
	public UserNotAuthenticatedException() {
		super(Message.USER_NOT_AUTHENTICATED, HttpStatus.FORBIDDEN, InternalErrorCode.USER_NOT_AUTHENTICATED);
    }
}