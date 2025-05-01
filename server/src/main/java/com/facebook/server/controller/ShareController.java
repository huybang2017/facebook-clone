package com.facebook.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.facebook.server.dto.request.ShareRequest;
import com.facebook.server.entity.Share;
import com.facebook.server.service.ShareService;

import java.util.List;

@RestController
@RequestMapping("/shares")
public class ShareController {

    private final ShareService shareService;

    @Autowired
    public ShareController(ShareService shareService) {
        this.shareService = shareService;
    }

    @GetMapping
    public ResponseEntity<List<Share>> getAllShares() {
        return ResponseEntity.ok(shareService.getAllShares());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Share> getShareById(@PathVariable String id) {
        return shareService.getShareById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Share> createShare(@RequestBody ShareRequest shareRequest) {
        return ResponseEntity.ok(shareService.createShare(shareRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Share> updateShare(@PathVariable String id, @RequestBody Share share) {
        return ResponseEntity.ok(shareService.updateShare(id, share));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShare(@PathVariable String id) {
        shareService.deleteShare(id);
        return ResponseEntity.noContent().build();
    }
}
