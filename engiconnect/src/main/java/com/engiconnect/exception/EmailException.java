package com.engiconnect.exception;

/**
 * Custom checked exception for email-related errors.
 * @author Denis
 */
public class EmailException extends Exception  {
	
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

    /**
     * Constructs a new EmailException.
     *
     * @param message the detail message.
     * @param cause   the error cause. 
     */
    public EmailException(String message, Throwable cause) {
        super(message, cause);
    }
}