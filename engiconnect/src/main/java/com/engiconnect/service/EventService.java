package com.engiconnect.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.engiconnect.dto.EmailInfo;
import com.engiconnect.events.RegistrationEvent;
import com.engiconnect.events.ResetPasswordEvent;
import com.engiconnect.exception.EmailException;
import com.engiconnect.model.User;
import com.engiconnect.type.EmailTemplateData;
import com.engiconnect.type.EmailType;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;

/**
 * Service class for handling events.
 * 
 * @author Denis
 */
@Service
@AllArgsConstructor
public class EventService {
	
	/**
	 * The email service responsible for sending email.
	 */
    private final EmailService emailService;
    
    /**
     * The JWT (JSON Web Token) service used for generating email confirmation tokens.
     */
    private final JwtService jwtService;

    /**
     * Event listener method for handling user registration events.
     *
     * @param event The RegistrationEvent containing user registration information.
     */
    @EventListener
    public void handleUserRegistration(RegistrationEvent event) {
    	User newUser = event.getUser();     
        
        Map<String, Object> emailData = new HashMap<>();
        emailData.put(EmailTemplateData.NAME.getName(), newUser.getName());
        
        String token = jwtService.generateEmailConfirmationToken(newUser.getId(), newUser.getRegistrationDate());
		emailData.put(EmailTemplateData.TOKEN.getName(), token);
		
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
	    String baseUrl = ServletUriComponentsBuilder.fromRequestUri(request)
	    		.replacePath(null)
	    		.build()
	    		.toUriString();
	    emailData.put(EmailTemplateData.BASEURL.getName(), baseUrl);
		
        try {
        	/**
        	 * Object containing information about the email.
        	 */
            EmailInfo emailInfo = new EmailInfo();
            emailInfo.setType(EmailType.CONFIRM_REGISTRATION);
            emailInfo.setEmailAddress(newUser.getEmail());
    		emailInfo.setEmailData(emailData);
    		
        	emailService.sendEmail(emailInfo);
		} catch (EmailException e) {
			System.err.println("Could not send registration email!");
		}
    }
    
    @EventListener
    public void handleUserResetPassword(ResetPasswordEvent event) {
    	User forgottenUser = event.getUser();     
        
        Map<String, Object> emailData = new HashMap<>();
        emailData.put(EmailTemplateData.NAME.getName(), forgottenUser.getName());
        
        String token = jwtService.generatePasswordResetToken(forgottenUser.getId());
		emailData.put(EmailTemplateData.TOKEN.getName(), token);
		
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
	    String baseUrl = ServletUriComponentsBuilder.fromRequestUri(request)
	    		.replacePath(null)
	    		.build()
	    		.toUriString();
	    emailData.put(EmailTemplateData.BASEURL.getName(), baseUrl);
		
        try {
        	/**
        	 * Object containing information about the email.
        	 */
            EmailInfo emailInfo = new EmailInfo();
            emailInfo.setType(EmailType.RESET_PASSWORD);
            emailInfo.setEmailAddress(forgottenUser.getEmail());
    		emailInfo.setEmailData(emailData);
    		
        	emailService.sendEmail(emailInfo);
		} catch (EmailException e) {
			System.err.println("Could not send registration email!");
		}
    }
}
