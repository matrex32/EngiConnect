package com.engiconnect.service;

import com.engiconnect.config.FileStorageConfig;
import com.engiconnect.converter.DocumentConverter;
import com.engiconnect.dto.DocumentDto;
import com.engiconnect.model.Document;
import com.engiconnect.model.User;
import com.engiconnect.repository.DocumentRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
	private FileStorageConfig fileStorageConfig;
    
    @Autowired
	private DocumentConverter documentConverter;

    public String saveDocument(MultipartFile document, String title, String description, String author, String department,String degreeType, String specialization, User user) throws IOException {
        if (document.isEmpty()) {
            throw new IOException("Cannot save empty file");
        }

        Path uploadPath = Paths.get(fileStorageConfig.getDocumentDir());
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String filename = user.getId() + "_" + System.currentTimeMillis() + "_" + document.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);

        Files.copy(document.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Document newDocument = new Document();
        newDocument.setUser(user);
        newDocument.setTitle(title);
        newDocument.setDescription(description);
        newDocument.setFilePath(filename);
        newDocument.setAuthor(author);
        newDocument.setDepartment(department);
        newDocument.setDegreeType(filename);
        newDocument.setUploadedAt(new Timestamp(System.currentTimeMillis()));
        newDocument.setDegreeType(degreeType);
        newDocument.setSpecialization(specialization);
        documentRepository.save(newDocument);

        return Paths.get(fileStorageConfig.getDocumentDir()).relativize(filePath).toString();
    }

    
    @Transactional
    public void deleteDocument(Integer documentId) throws IOException {

    	Document document = documentRepository.findById(documentId).orElseThrow(() -> new IllegalStateException("Document not found with id: " + documentId));
        
        Path filePath = Paths.get(fileStorageConfig.getDocumentDir(), document.getFilePath());
        if (Files.exists(filePath)) {
            Files.delete(filePath);
        } else {
            throw new IOException("Failed to find the document file on disk.");
        }

        documentRepository.delete(document);
    }
    
    public List<DocumentDto> findAllDocuments() {
        return documentRepository.findAllByOrderByUploadedAtDesc().stream()
                .map(documentConverter::entityToDto)
                .collect(Collectors.toList());
    }
}
