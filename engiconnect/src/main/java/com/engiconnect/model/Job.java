package com.engiconnect.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "jobs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Job {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false)
	    private String title;

	    @Column(nullable = false)
	    private String description;
	    
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "user_id")
	    private User user; 
	    
	    @Column(name = "created_at", nullable = false, updatable = false, insertable = false)
	    private Timestamp createdAt;
	    
	    @Column(nullable = false)
	    private String city;

	    @Column(nullable = false)
	    private String state;

	    @Column(name = "employment_type", nullable = false)
	    private String employmentType;

	    @Column(nullable = false)
	    private Double salary;

	    @Column(nullable = false)
	    private Integer vacancies;

	    @Column(name = "seniority_level", nullable = false)
	    private String seniorityLevel;
	    
	    @Column(nullable = true)
	    private String currency;
}
