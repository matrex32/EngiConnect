package com.engiconnect.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

/**
 * MVC Configuration class for registering specific view controllers.
 * 
 * @author Denis
 */
@Configuration
public class MvcConfig implements WebMvcConfigurer {

	/**
	 * Overrides the default method to add view controllers to the registry.
	 */
	@Override
	public void addViewControllers( ViewControllerRegistry registry ) {
		registry.addViewController("/").setViewName("profile");
		registry.addViewController("/login").setViewName("login");
		registry.addViewController("/profile").setViewName("profile");
		registry.addViewController("/reset-password").setViewName("reset");
		registry.addViewController("/user-profile").setViewName("user-profile");
		registry.addViewController("/searched-user").setViewName("searched-user");
		registry.addViewController("/news").setViewName("feed");
		registry.addViewController("/jobs").setViewName("job");		
		registry.addViewController("/library").setViewName("library");	
	}
	
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
        .addResourceLocations("file:///E:/EngiConnect/uploads/profile_picture/")
        .addResourceLocations("file:///E:/EngiConnect/uploads/feed_picture/");
    }
}
