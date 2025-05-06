package com.facebook.server.service;

import com.facebook.server.dto.model.ChatModel;
import com.facebook.server.dto.request.AddUserToGroupChatRequest;
import com.facebook.server.dto.request.GroupChatNameRequest;
import com.facebook.server.dto.request.GroupChatRequest;
import com.facebook.server.dto.response.ChatIdResponse;
import com.facebook.server.dto.response.ChatResponse;
import com.facebook.server.entity.Chat;
import com.facebook.server.entity.constants.LeaveReason;
import org.springframework.web.multipart.MultipartFile;

public interface ChatService {

    ChatIdResponse chatUser(Long friendId);

    ChatResponse fetchAllUserChats(Long userId, int pageNo, int pageSize);

    ChatModel findChatById(Long chatId, Long userId);

    ChatIdResponse createGroupChat(GroupChatRequest request);

    void uploadGroupChatPhoto(Long chatId, MultipartFile file);

    void updateGroupChatName(GroupChatNameRequest request);

    void addUserToGroupChat(Long chatId, AddUserToGroupChatRequest request);

    void leaveGroupChat(Long chatId, Long userId, LeaveReason leaveReason);

    Chat getChat(Long chatId);
}
