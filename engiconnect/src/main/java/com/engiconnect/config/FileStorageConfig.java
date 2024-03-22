package com.engiconnect.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Configuration
public class FileStorageConfig {

	@Value("${file.upload-dir}")
    private String uploadDir;
	
	@Value("${file.cv-upload-dir}")
	private String cvUploadDir;
}
