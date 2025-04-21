package com.facebook.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.facebook.server.entity.Share;
import com.facebook.server.repository.ShareRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ShareService {

    private final ShareRepository shareRepository;

    @Autowired
    public ShareService(ShareRepository shareRepository) {
        this.shareRepository = shareRepository;
    }

    public List<Share> getAllShares() {
        return shareRepository.findAll();
    }

    public Optional<Share> getShareById(String id) {
        return shareRepository.findById(id);
    }

    public Share createShare(Share share) {
        return shareRepository.save(share);
    }

    public Share updateShare(String id, Share updatedShare) {
        return shareRepository.findById(id)
                .map(share -> {
                    share.setUser(updatedShare.getUser());
                    share.setPost(updatedShare.getPost());
                    share.setCreatedAt(updatedShare.getCreatedAt());
                    return shareRepository.save(share);
                })
                .orElseThrow(() -> new RuntimeException("Share not found with id: " + id));
    }

    public void deleteShare(String id) {
        shareRepository.deleteById(id);
    }
}
