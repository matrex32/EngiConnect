package com.engiconnect.dto;

import com.engiconnect.model.Like;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LikeDto {

	private Integer userId;
    private Integer postId;
	private Like like;
    private int totalLikes;
    private boolean isLikedByUser;
}
