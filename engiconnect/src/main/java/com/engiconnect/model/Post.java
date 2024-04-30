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
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "posts")
@NoArgsConstructor
public class Post {

	/**
     * Unique id of the post.
     */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_id")
    private Integer id;
	
	/**
     * The user who created the post.
     * This establishes a Many-to-One relationship between posts and users.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "title")
    private String title;
    
    /**
     * The content of the post.
     */
    @Column(name = "content")
    private String content;

    /**
     * The URL of the image attached to the post, if any.
     */
    @Column(name = "image_url")
    private String imageUrl;

    /**
     * The timestamp when the post was created.
     * Automatically set to the current timestamp when the post is created.
     */
    @Column(name = "created_at")
    private Timestamp createdAt;
}
