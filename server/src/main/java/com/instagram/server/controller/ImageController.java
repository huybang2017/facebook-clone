package com.instagram.server.controller;

import com.instagram.server.entity.Image;
import com.instagram.server.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
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
        if (image.isPresent()) {
            return ResponseEntity.ok(image.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Image createImage(@RequestBody Image image) {
        return imageService.createImage(image);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Image> updateImage(@PathVariable String id, @RequestBody Image imageDetails) {
        try {
            Image updatedImage = imageService.updateImage(id, imageDetails);
            return ResponseEntity.ok(updatedImage);
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
