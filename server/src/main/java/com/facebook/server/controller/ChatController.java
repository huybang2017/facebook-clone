package com.facebook.server.controller;

import com.facebook.server.dto.model.ChatModel;
import com.facebook.server.dto.request.AddUserToGroupChatRequest;
import com.facebook.server.dto.request.GroupChatNameRequest;
import com.facebook.server.dto.request.GroupChatRequest;
import com.facebook.server.dto.response.ChatIdResponse;
import com.facebook.server.dto.response.ChatResponse;
import com.facebook.server.entity.constants.LeaveReason;
import com.facebook.server.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/{friendId}")
    public ChatIdResponse chatUser(@PathVariable("friendId") Long friendId) {
        return chatService.chatUser(friendId);
    }

    @GetMapping("/{userId}")
    public ChatResponse fetchAllUserChats(@PathVariable("userId") Long userId,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        return chatService.fetchAllUserChats(userId, pageNo, pageSize);
    }

    @GetMapping("/get/{chatId}/{userId}")
    public ChatModel findChatById(@PathVariable("chatId") Long chatId,
            @PathVariable("userId") Long userId) {
        return chatService.findChatById(chatId, userId);
    }

    @PostMapping("/group/create")
    public ChatIdResponse createGroupChat(@RequestBody @Valid GroupChatRequest request) {
        return chatService.createGroupChat(request);
    }

    @PostMapping("/group/upload/image/{chatId}")
    public void uploadGroupChatPhoto(@PathVariable("chatId") Long chatId,
            @RequestParam(value = "file") MultipartFile files) {
        chatService.uploadGroupChatPhoto(chatId, files);
    }

    @PostMapping("/group/change/name")
    public void updateGroupChatName(@RequestBody @Valid GroupChatNameRequest request) {
        chatService.updateGroupChatName(request);
    }

    @PostMapping("/group/add/user/{chatId}")
    public void addUserToGroupChat(@PathVariable("chatId") Long chatId,
            @RequestBody @Valid AddUserToGroupChatRequest request) {
        chatService.addUserToGroupChat(chatId, request);
    }

    @PostMapping("/group/leave/{chatId}/{userId}/{leaveReason}")
    public void leaveGroupChat(@PathVariable("chatId") Long chatId,
            @PathVariable("userId") Long userId,
            @PathVariable("leaveReason") LeaveReason leaveReason) {
        chatService.leaveGroupChat(chatId, userId, leaveReason);
    }
}
