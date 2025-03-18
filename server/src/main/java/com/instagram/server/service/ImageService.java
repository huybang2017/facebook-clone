package com.instagram.server.service;

import com.instagram.server.entity.Image;
import com.instagram.server.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public Optional<Image> getImageById(String id) {
        return imageRepository.findById(id);
    }

    public Image createImage(Image image) {
        return imageRepository.save(image);
    }

    public Image updateImage(String id, Image imageDetails) {
        Optional<Image> optionalImage = imageRepository.findById(id);
        if (optionalImage.isPresent()) {
            Image image = optionalImage.get();
            image.setImage(imageDetails.getImage());
            image.setUpdatedAt(LocalDateTime.now());
            return imageRepository.save(image);
        } else {
            throw new RuntimeException("Image not found with id " + id);
        }
    }

    public void deleteImage(String id) {
        imageRepository.deleteById(id);
    }
}
