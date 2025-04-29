package com.facebook.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.facebook.server.dto.request.FriendRequest;
import com.facebook.server.dto.response.FriendResponse;
import com.facebook.server.service.FriendService;

@RestController
@RequestMapping("/friends")
public class FriendController {

    private final FriendService friendService;

    @Autowired
    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @PostMapping
    public ResponseEntity<FriendResponse> createFriend(@RequestBody FriendRequest request) {
        return ResponseEntity.ok(friendService.createFriend(request));
    }

    @DeleteMapping
    public ResponseEntity<Void> unfriend(@RequestParam String userId, @RequestParam String suggestedFriendId) {
        friendService.unfriend(userId, suggestedFriendId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> isFriend(@RequestParam String userId, @RequestParam String suggestedFriendId) {
        return ResponseEntity.ok(friendService.isFriend(userId, suggestedFriendId));
    }
}
