package com.engiconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.net.MalformedURLException;
import java.nio.file.Paths;
import java.nio.file.Path;

import org.springframework.http.HttpHeaders;

import com.engiconnect.config.FileStorageConfig;
import com.engiconnect.converter.UserConverter;
import com.engiconnect.dto.ChangePasswordDto;
import com.engiconnect.dto.DeleteUserDto;
import com.engiconnect.dto.EmailResetPasswordDto;
import com.engiconnect.dto.ResetPasswordDto;
import com.engiconnect.dto.UpdateUserDto;
import com.engiconnect.dto.UserDto;
import com.engiconnect.exception.UserNotAuthenticatedException;
import com.engiconnect.exception.EngiConnectException;
import com.engiconnect.message.Message;
import com.engiconnect.model.User;
import com.engiconnect.model.UserStatus;
import com.engiconnect.service.UserService;
import com.engiconnect.service.ValidationService;
import com.engiconnect.type.UrlAnchor;

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
	
	@Autowired
	private FileStorageConfig fileStorageConfig;
	
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
	
	/**
     * Handles the GET request to fetch profile details of the authenticated user.
     * 
     * @return The profile details of the authenticated user.
     */
	@GetMapping("/me")
	public UserDto getCurrentUser() {
		try {
			User currentUser = userService.getCurrentUser();
			return userConverter.entityToDto(currentUser);

		} catch (UserNotAuthenticatedException e) {
			return new UserDto("Anonymous User", "anonymousUser", null, UserStatus.ACTIVE.getStatus(), null, null, null, null, null, null, null, null, null, null);
		}
	}
    
    
    /**
     * Updates the name of the currently authenticated user based on the provided {@link UpdateUserNameDto}.
     * 
     * @param nameChange  A DTO containing the new name for the user.
     * @return A DTO representation of the updated user or null if the user is not recognized.
     * @throws Exception if validation fails. 
     */
    @PutMapping("/profile")
    public UserDto updateUserName(@RequestBody UpdateUserDto updatedUser ) {
    	validationService.validate(updatedUser.getName());
    	User updatedCurrentUser = userService.updateCurrentUser(updatedUser);
        return userConverter.entityToDto(updatedCurrentUser);
    }

    /**
     * Updates the password of the currently authenticated user based on the provided {@link ChangePasswordDto}
     * 
     * @param changePasswordDto A DTO containing the new password and the old password.
     * @return A DTO representation of the updated user or null if the user is not recognized.
     */
    @PutMapping("/password")
    public UserDto changePassword(@RequestBody ChangePasswordDto changePasswordDto) {
    	validationService.validate(changePasswordDto);
    	User updatedUser = userService.updateCurrentUserPassword(changePasswordDto);
    	return userConverter.entityToDto(updatedUser);
    }
    
    /**
     * Set the status of the currently authenticated user as "deleted" and the deletion time 
     * 
     * @param deleteUserDto The data transfer object containing the necessary information to process the user deletion.
     * @return A DTO representation of the deleted user, preserving the relevant user details even after deletion. 
     */
    @PutMapping("/delete")
    public UserDto deleteUser(@RequestBody DeleteUserDto deleteUserDto) {
        User deletedUser = userService.deleteUser(deleteUserDto);
        return userConverter.entityToDto(deletedUser);
    }
    
    /**
     *  Set the status of the currently authenticated user as "active" and set the deletion time to null.
     *  This endpoint is a reverse method of the delete endpoint
     * 
     * @return A DTO representation of the recovered user, showcasing the user details post-recovery. 
     */
    @PutMapping("/recover")
    public UserDto deleteUser() {
        User recoveredUser = userService.recoverUser();
        return userConverter.entityToDto(recoveredUser);
    }
    
    /**
     * This endpoint is used to confirm user registration through a given token.
     * 
     * @param token The token used for confirming user registration.
     * @return RedirectView object directing to the corresponding URL based on the operation's outcome.
     */
    @GetMapping("/confirm")
    public RedirectView confirmUserRegistration(@RequestParam String token) {

    	if(token == null) {
    		return new RedirectView(UrlAnchor.INVALID_TOKEN.getAnchor());
    	}
    	
    	try {
            userService.confirmUserRegistration(token);
            return new RedirectView(UrlAnchor.SUCCES_CONFIRMATION.getAnchor());
            
        } catch (EngiConnectException e) {
            String messageId = e.getMessageId();
            
            if(messageId.equals(Message.INVALID_TOKEN.getId())) {
            	return new RedirectView(UrlAnchor.INVALID_TOKEN.getAnchor());
            	
            } else if(messageId.equals(Message.TOKEN_EXPIRED.getId())) {
            	return new RedirectView(UrlAnchor.TOKEN_EXPIRED.getAnchor());
            	
            } else if(messageId.equals(Message.USER_ALREADY_CONFIRMED.getId())) {
            	return new RedirectView(UrlAnchor.USER_ALREADY_CONFIRMED.getAnchor());
            	
            } else {
            	return new RedirectView(UrlAnchor.SOMETHING_WENT_WRONG.getAnchor());
            }
        }
    }
    
    /**
     * Initiates a password reset process for a user based on the provided email address.
     * 
     * @param email The email address of the user for whom the password reset process is to be initiated.
     * @return A {@code UserDto} representation of the user associated with the provided email.
     */
    @PostMapping("/email-reset-password")
    public UserDto emailResetPassword(@RequestBody EmailResetPasswordDto emailDto) {
    	User forgottenUser = userService.emailResetPassword(emailDto);
    	
    	return userConverter.entityToDto(forgottenUser);
    }
    
    /**
     * This endpoint is used to confirm user registration through a given token.
     * 
     * @param token The token used for confirming user registration.
     * @return RedirectView object directing to the corresponding URL based on the operation's outcome.
     */
    @GetMapping("/redirect-reset-password")
    public RedirectView redirectResetPasswordForm(@RequestParam String token) {

    	if(token == null) {
    		return new RedirectView(UrlAnchor.INVALID_TOKEN.getAnchor());
    	}
    	
    	try {
            userService.validateToken(token);
            return new RedirectView("/reset-password?token=" + token);
            
        } catch (EngiConnectException e) {
            String messageId = e.getMessageId();
            
            if(messageId.equals(Message.INVALID_TOKEN.getId())) {
            	return new RedirectView(UrlAnchor.INVALID_TOKEN.getAnchor());
            	
            } else if(messageId.equals(Message.TOKEN_EXPIRED.getId())) {
            	return new RedirectView(UrlAnchor.TOKEN_EXPIRED.getAnchor());
            	
            } else {
            	return new RedirectView(UrlAnchor.SOMETHING_WENT_WRONG.getAnchor());
            }
        }
    }
    
    /**
     * Updates the password of the currently authenticated user based on the provided 
     * 
     * @param resetPasswordDto A DTO containing the new password.
     */
    @PutMapping("/reset-user-password")
    public UserDto resetPassword(@RequestBody ResetPasswordDto request) {
    	
    		validationService.validate(request.getNewPassword());
    		User resetUserPassword = userService.resetPassword(request);
    		
    		return userConverter.entityToDto(resetUserPassword);
    }
    
    @PutMapping("/profile-image")
    public UserDto updateProfileImage(@RequestParam("image") MultipartFile image) {
        User currentUser = userService.getCurrentUser();
        try {
            String imagePath = userService.saveProfileImage(image, currentUser);
            currentUser.setProfileImagePath(imagePath);
            User updatedUser = userService.updateUser(currentUser);
            return userConverter.entityToDto(updatedUser);
        } catch (IOException e) {
            throw new RuntimeException("Problem with file upload", e);
        }
    }
    
    @PutMapping("/cv")
    public UserDto updateUserCv(@RequestParam("cv") MultipartFile userCv) {
        User currentUser = userService.getCurrentUser();
        try {
            String userCvPath = userService.saveUserCv(userCv, currentUser);
            currentUser.setUserCvPath(userCvPath);
            User updatedUser = userService.updateUser(currentUser);
            return userConverter.entityToDto(updatedUser);
        } catch (IOException e) {
            throw new RuntimeException("Problem with file upload", e);
        }
    }
    
    @GetMapping("/cv/{filename:.+}")
    public ResponseEntity<Resource> serveOrDownloadCv(@PathVariable String filename) {
        Path path = Paths.get(fileStorageConfig.getCvUploadDir() + "/" + filename); 
        Resource resource;
        try {
            resource = new UrlResource(path.toUri());
            if (resource.exists() || resource.isReadable()) {
                String contentDisposition = "inline; filename=\"" + resource.getFilename() + "\""; 
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_PDF)
                        .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/delete-cv")
    public UserDto deleteUserCv() {
        User currentUser = userService.getCurrentUser();
        try {
            userService.deleteUserCv(currentUser); 
            currentUser.setUserCvPath(null); 
            User updatedUser = userService.updateUser(currentUser);
            return userConverter.entityToDto(updatedUser);
        } catch (IOException e) {
            throw new RuntimeException("Problem with CV deletion", e);
        }
    }

}
