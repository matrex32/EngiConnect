package com.engiconnect.type;

import lombok.Getter;

/**
 * An enumeration representing data used in email templates.
 * 
 * @author Denis
 */
@Getter
public enum EmailTemplateData {
	
	/**
     * Tag for the user's name.
     */
	NAME("name"),

	/**
     * Tag for an email confirmation token.
     */
	TOKEN("token"),
	
	/**
     * Tag for the position
     */
	JOB_TITLE("jobTitle"),
	
	/**
     * Tag for the position
     */
	CV_URL("cvUrl"),
	
	/**
     * Tag for the position
     */
	COMPANY_NAME("companyName"),
	
    /**
     * Tag for the base URL of the application.
     */
	BASEURL("baseUrl");
	
	/**
     * The string key used to store the actual tag.
     */
	private final String name;

	/**
	 * Constructs a new enum instance with the specified string key.
	 */
	private EmailTemplateData(String name) {
		this.name = name;
	}
}