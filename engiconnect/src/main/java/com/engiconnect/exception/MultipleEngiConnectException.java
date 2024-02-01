package com.engiconnect.exception;

import java.util.List;

import org.springframework.http.HttpStatus;

import com.engiconnect.message.Message;

import lombok.Getter;

/**
 *  This class represents an exception that encapsulates multiple error messages and corresponding IDs
 *  @author Denis
 */
@Getter
public class MultipleEngiConnectException extends EngiConnectException {

	/**
	 * Unique ID used in serialization to verify that the sender and receiver of a serialized object maintain compatibility.
	 */
	private static final long serialVersionUID = 1;
	
	/**
	 *  A list of InputValidationError objects that represent the specific validation errors
	 */
	private final transient List<InputValidationError> fieldErrors;
	
	/**
	 * Constructs a MultipleOxygenAccountException with the specified details
	 * 
	 * @param fieldErrors The list of InputValidationError objects associated with this exception.
	 */
	public MultipleEngiConnectException(List<InputValidationError> fieldErrors) {
		super(Message.THE_CURRENT_REQUEST_FAILED, HttpStatus.UNPROCESSABLE_ENTITY, InternalErrorCode.THE_CURRENT_REQUEST_FAILED);
		this.fieldErrors = fieldErrors;
	}
}
