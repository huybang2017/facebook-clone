package com.facebook.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.facebook.server.dto.request.ShareRequest;
import com.facebook.server.entity.Post;
import com.facebook.server.entity.Share;
import com.facebook.server.entity.User;
import com.facebook.server.repository.PostRepository;
import com.facebook.server.repository.ShareRepository;
import com.facebook.server.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ShareService {

    private final ShareRepository shareRepository;

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Autowired
    public ShareService(ShareRepository shareRepository,
            UserRepository userRepository,
            PostRepository postRepository) {
        this.shareRepository = shareRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public List<Share> getAllShares() {
        return shareRepository.findAll();
    }

    public Optional<Share> getShareById(String id) {
        return shareRepository.findById(id);
    }

    public Share createShare(ShareRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Share share = new Share();
        share.setUser(user);
        share.setPost(post);

        return shareRepository.save(share);
    }

    public Share updateShare(String id, Share updatedShare) {
        return shareRepository.findById(id)
                .map(share -> {
                    share.setUser(updatedShare.getUser());
                    share.setPost(updatedShare.getPost());
                    return shareRepository.save(share);
                })
                .orElseThrow(() -> new RuntimeException("Share not found with id: " + id));
    }

    public void deleteShare(String id) {
        shareRepository.deleteById(id);
    }
}
