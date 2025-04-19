package com.facebook.server.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.facebook.server.entity.Image;
import com.facebook.server.entity.Video;
import com.facebook.server.repository.ImageRepository;
import com.facebook.server.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class VideoService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private ImageRepository imageRepository;

    // Upload video + thumbnail
    public Video uploadVideoWithThumbnail(MultipartFile videoFile, MultipartFile thumbnailFile,
            String title, String description) throws IOException {

        if (videoFile == null || videoFile.isEmpty()) {
            throw new IllegalArgumentException("Video file is required.");
        }

        // Upload video
        Map<?, ?> videoResult = cloudinary.uploader().upload(videoFile.getBytes(),
                ObjectUtils.asMap("resource_type", "video"));
        String videoUrl = (String) videoResult.get("secure_url");

        // Upload thumbnail if provided
        Image savedThumbnail = null;
        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
            Map<?, ?> thumbResult = cloudinary.uploader().upload(thumbnailFile.getBytes(), ObjectUtils.emptyMap());
            String thumbUrl = (String) thumbResult.get("secure_url");

            Image thumbnail = new Image();
            thumbnail.setImage(thumbUrl);
            savedThumbnail = imageRepository.save(thumbnail);
        }

        // Create video entity
        Video video = new Video();
        video.setVideo(videoUrl);
        video.setThumbnail(savedThumbnail);
        video.setTitle(title);
        video.setDescription(description);

        return videoRepository.save(video);
    }

    // Get all videos
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    // Get single video
    public Optional<Video> getVideoById(String id) {
        return videoRepository.findById(id);
    }

    // Update video
    public Video updateVideo(String id, MultipartFile videoFile, MultipartFile thumbnailFile,
            String title, String description) throws IOException {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found with id: " + id));

        // Update video if new file provided
        if (videoFile != null && !videoFile.isEmpty()) {
            Map<?, ?> videoResult = cloudinary.uploader().upload(videoFile.getBytes(),
                    ObjectUtils.asMap("resource_type", "video"));
            String videoUrl = (String) videoResult.get("secure_url");
            video.setVideo(videoUrl);
        }

        // Update thumbnail if new file provided
        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
            Map<?, ?> thumbResult = cloudinary.uploader().upload(thumbnailFile.getBytes(), ObjectUtils.emptyMap());
            String thumbUrl = (String) thumbResult.get("secure_url");

            Image thumbnail = new Image();
            thumbnail.setImage(thumbUrl);
            Image savedThumb = imageRepository.save(thumbnail);

            video.setThumbnail(savedThumb);
        }

        // Update title & description
        video.setTitle(title);
        video.setDescription(description);

        return videoRepository.save(video);
    }

    // Delete video
    public void deleteVideo(String id) {
        if (!videoRepository.existsById(id)) {
            throw new RuntimeException("Video không tồn tại với id: " + id);
        }
        videoRepository.deleteById(id);
    }
}
