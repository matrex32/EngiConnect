package com.engiconnect.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentDto {

    private Integer commentId;
    private String commentText;
    private Integer postId;
    private Integer userId;
    private UserDto userDto; 
}
