package com.engiconnect.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "likes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Like {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer likeId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "post_id", nullable = false)
	private Post post;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
}
