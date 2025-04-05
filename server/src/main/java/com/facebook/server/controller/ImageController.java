package com.facebook.server.controller;

import com.facebook.server.entity.Image;
import com.facebook.server.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping
    public List<Image> getAllImages() {
        return imageService.getAllImages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable String id) {
        Optional<Image> image = imageService.getImageById(id);
        return image.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Image> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            Image image = imageService.uploadImage(file);
            return ResponseEntity.ok(image);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Image> updateImage(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        try {
            Image updatedImage = imageService.updateImage(id, file);
            return ResponseEntity.ok(updatedImage);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable String id) {
        imageService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }
}
