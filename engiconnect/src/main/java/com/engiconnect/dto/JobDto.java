package com.engiconnect.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JobDto {
	
	
    private Long id;
    private String title;
    private String description;
    private Integer userId;
    private UserDto user; 
    private String city;
    private String state;
    private String employmentType;
    private Double salary;
    private Integer vacancies;
    private String seniorityLevel;
    private String currency;
}
