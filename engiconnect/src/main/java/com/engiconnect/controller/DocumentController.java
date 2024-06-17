package com.engiconnect.controller;

import com.engiconnect.config.FileStorageConfig;
import com.engiconnect.converter.UserConverter;
import com.engiconnect.dto.DocumentDto;
import com.engiconnect.model.User;
import com.engiconnect.service.DocumentService;
import com.engiconnect.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @Autowired
	private FileStorageConfig fileStorageConfig;
    
    @Autowired
	private UserService userService;
    
    @Autowired
    private UserConverter userConverter;
    
    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(@RequestParam("document") MultipartFile document,
                                            @RequestParam("title") String title,
                                            @RequestParam("description") String description,
                                            @RequestParam("author") String author,
                                            @RequestParam("department") String department,
                                            @RequestParam("degreeType") String degreeType,
                                            @RequestParam("specialization") String specialization) {
    	
        try {
        	User currentUser = userService.getCurrentUser();
            
            String documentPath = documentService.saveDocument(document, title, description, author, department, degreeType, specialization, currentUser);

            DocumentDto documentDto = new DocumentDto();
            documentDto.setTitle(title);
            documentDto.setDescription(description);
            documentDto.setFilePath(documentPath); 
            documentDto.setUploader(userConverter.entityToDto(currentUser)); 
            documentDto.setUploadedAt(new Timestamp(System.currentTimeMillis())); 

            return ResponseEntity.ok(documentDto);
        } catch (IOException e) {
            String errorMessage = "Failed to upload document: " + document.getOriginalFilename();
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }


    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getDocument(@PathVariable String filename) {
        Path path = Paths.get(fileStorageConfig.getDocumentDir() + "/" + filename);
        Resource resource;
        try {
            resource = new UrlResource(path.toUri());
            if (resource.exists() || resource.isReadable()) {
                String contentDisposition = "attachment; filename=\"" + resource.getFilename() + "\"";
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_PDF)
                        .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Integer id) {
        try {
            documentService.deleteDocument(id);
            return ResponseEntity.ok().body("Document deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete document.");
        }
    }
    
    @GetMapping
    public List<DocumentDto> getAllPosts() {
    	return documentService.findAllDocuments();
    }
}
