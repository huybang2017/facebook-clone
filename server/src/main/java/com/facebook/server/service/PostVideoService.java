package com.facebook.server.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.facebook.server.entity.Image;
import com.facebook.server.entity.PostVideo;
import com.facebook.server.repository.ImageRepository;
import com.facebook.server.repository.PostVIdeoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PostVideoService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private PostVIdeoRepository postVideoRepository;

    @Autowired
    private ImageRepository imageRepository;

    // Upload video with thumbnail and save it
    public PostVideo uploadVideoWithThumbnail(MultipartFile videoFile, MultipartFile thumbnailFile,
            String title, String description, String userId, String postId) throws IOException {
        Map<?, ?> videoResult = cloudinary.uploader().upload(videoFile.getBytes(),
                ObjectUtils.asMap("resource_type", "video"));

        String videoUrl = (String) videoResult.get("secure_url");

        Map<?, ?> thumbnailResult = cloudinary.uploader().upload(thumbnailFile.getBytes(), ObjectUtils.emptyMap());
        String thumbnailUrl = (String) thumbnailResult.get("secure_url");

        Image image = new Image();
        image.setImage(thumbnailUrl);
        Image savedImage = imageRepository.save(image);

        PostVideo postVideo = new PostVideo();
        postVideo.setVideo(videoUrl);
        postVideo.setThumbnail(savedImage);
        postVideo.setTitle(title);
        postVideo.setDescription(description);
        postVideo.setUserId(userId);
        postVideo.setPostId(postId);

        return postVideoRepository.save(postVideo);
    }

    // Get all videos
    public List<PostVideo> getAllVideos() {
        return postVideoRepository.findAll();
    }

    // Get video by ID
    public Optional<PostVideo> getVideoById(String id) {
        return postVideoRepository.findById(id);
    }

    // Update video by ID
    public PostVideo updateVideo(String id, MultipartFile videoFile, MultipartFile thumbnailFile,
            String title, String description) throws IOException {
        Optional<PostVideo> optionalPostVideo = postVideoRepository.findById(id);

        if (optionalPostVideo.isPresent()) {
            PostVideo postVideo = optionalPostVideo.get();

            Map<?, ?> videoResult = cloudinary.uploader().upload(videoFile.getBytes(),
                    ObjectUtils.asMap("resource_type", "video"));
            String videoUrl = (String) videoResult.get("secure_url");

            Map<?, ?> thumbnailResult = cloudinary.uploader().upload(thumbnailFile.getBytes(), ObjectUtils.emptyMap());
            String thumbnailUrl = (String) thumbnailResult.get("secure_url");

            Image image = new Image();
            image.setImage(thumbnailUrl);
            imageRepository.save(image);

            postVideo.setVideo(videoUrl);
            postVideo.setThumbnail(image);
            postVideo.setTitle(title);
            postVideo.setDescription(description);

            return postVideoRepository.save(postVideo);
        } else {
            throw new RuntimeException("Video not found with id " + id);
        }
    }

    // Delete video by ID
    public void deleteVideo(String id) {
        postVideoRepository.deleteById(id);
    }
}
