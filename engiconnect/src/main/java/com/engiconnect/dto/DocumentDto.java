package com.engiconnect.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentDto {

    private Integer documentId;
    private String title;
    private String description;
    private String filePath;  
    private Timestamp uploadedAt;
    private String department;
    private String author;
    private UserDto uploader;  
    private String degreeType;
    private String specialization;
}
