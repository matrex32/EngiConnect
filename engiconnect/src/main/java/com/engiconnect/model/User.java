package com.engiconnect.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *	The User class represents a user entity in the system.
 *	The class includes basic user information such as name, email, registration date and password.
 *	@author Denis
 */
@Data
@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
public class User {
	
	/**
	 * Unique id of the user.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	/**
	 * The name of the user.
	 */
	@Column(name = "name")
	private String name;
	
	/**
	 *  The email address of the user.
	 */
	@Column(name = "email")
	private String email;
	
	/**
	 *  The password of the user.
	 */
	@Column(name = "password")
	private String password;
	
	/**
	 *  The registration date of the user.
	 *  This field represents the date when the user's account is created.
	 *  It will be automatically saved in the database upon the creation of a new account.
	 */	
	@Column(name = "registration_date")
	private String registrationDate;

}
