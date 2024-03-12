package com.engiconnect.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *  Data Transfer Object representing the details required to reset a user's password.
 *  @author Denis
 */

@Getter
@Setter
@NoArgsConstructor
public class ResetPasswordDto {
	
	/**
	 * The unique token that is assigned to the user
	 */
	String token;
	
	/**
	 * The desired new password for the user.
	 */
	@Size(min = 8)
	private String newPassword;
}