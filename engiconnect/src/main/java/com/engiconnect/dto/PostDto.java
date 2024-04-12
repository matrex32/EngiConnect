package com.engiconnect.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class PostDto {

    private Integer postId;
    private String content;
    private String imageUrl;
    private String title;
    private Timestamp createdAt;
    private UserDto user;
    
}
