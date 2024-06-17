package com.engiconnect.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.engiconnect.dto.DocumentDto;
import com.engiconnect.model.Document;

@Component
public class DocumentConverter {

    @Autowired
    private UserConverter userConverter;  

    /**
     * Converts a {@link Document} object to a {@link DocumentDto} object.
     *
     * @param document the Document object to be converted.
     * @return the corresponding DocumentDto object with document details and uploader information.
     */
    public DocumentDto entityToDto(Document document) {
        DocumentDto documentDto = new DocumentDto();
        documentDto.setDocumentId(document.getId());
        documentDto.setTitle(document.getTitle());
        documentDto.setDescription(document.getDescription());
        documentDto.setDepartment(document.getDepartment());
        documentDto.setAuthor(document.getAuthor());  
        documentDto.setDegreeType(document.getDegreeType());
        documentDto.setSpecialization(document.getSpecialization());
        
        if (document.getFilePath() != null && !document.getFilePath().trim().isEmpty()) {
            String baseUrl = "http://localhost:8080"; 
            String fullDocumentUrl = baseUrl + "/uploads/documents/" + document.getFilePath();
            documentDto.setFilePath(fullDocumentUrl);
        } else {
            documentDto.setFilePath(null);
        }
        
        documentDto.setUploadedAt(document.getUploadedAt());
        documentDto.setUploader(userConverter.entityToDto(document.getUser()));

        return documentDto;
    }

    /**
     * Converts a {@link DocumentDto} object back to a {@link Document} entity.
     *
     * @param documentDto the DocumentDto to be converted.
     * @return the Document entity filled with details from the DTO.
     */
    public Document dtoToEntity(DocumentDto documentDto) {
        Document document = new Document();
        document.setTitle(documentDto.getTitle());
        document.setDescription(documentDto.getDescription());
        document.setDegreeType(documentDto.getDegreeType());
        document.setSpecialization(documentDto.getSpecialization());
        return document;
    }
}
