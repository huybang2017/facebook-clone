package com.facebook.server.service;

import com.facebook.server.dto.model.MessageModel;
import com.facebook.server.dto.request.SendMessageRequest;
import com.facebook.server.dto.response.MessageResponse;
import com.facebook.server.entity.Chat;
import com.facebook.server.entity.Message;

public interface MessageService {

    void sendMessage(SendMessageRequest request);

    MessageResponse fetchAllChatMessages(Long chatId, int pageNo, int pageSize);

    MessageModel getLastMessage(Long chatId);

    public void sendWStoGroupChat(Chat chat, Message message, MessageModel messageModel);
}
