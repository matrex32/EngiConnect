package com.engiconnect.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {

	@Setter
	private int internalErrorCode;
	
	@Setter
	private String errorMessage;
	
	@Setter
	private String messageId;
}
