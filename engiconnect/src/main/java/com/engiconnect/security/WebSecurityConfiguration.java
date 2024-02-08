package com.engiconnect.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.engiconnect.service.EngiConnectUserDetailsService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {

	@Autowired
	private EngiConnectUserDetailsService userDetailsService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
	}
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.csrf( csrf -> csrf.disable() )
		.authorizeHttpRequests(authz->authz
				.requestMatchers("/api/users/register").permitAll()
				.anyRequest().authenticated())
		.formLogin(form -> form
				.loginPage("/login")
				.permitAll())
		.logout(logout -> logout.logoutSuccessUrl("/login"));
		
		return http.build();
	}
	
	/**
	 *Configures Spring Security to ignore specific URL patterns for security checks.
	 */
	@Bean
	WebSecurityCustomizer ignoringCustomizer() {
		return web -> web.ignoring()
				.requestMatchers("/app/login.js")
        		.requestMatchers("/img/logo.jpg");
	}
	
}
