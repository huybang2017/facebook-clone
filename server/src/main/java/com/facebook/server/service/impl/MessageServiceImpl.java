package com.facebook.server.service.impl;

import com.facebook.server.dto.model.MessageModel;
import com.facebook.server.dto.request.SendMessageRequest;
import com.facebook.server.dto.response.MessageResponse;
import com.facebook.server.dto.response.PageResponse;
import com.facebook.server.entity.Chat;
import com.facebook.server.entity.Message;
import com.facebook.server.entity.User;
import com.facebook.server.entity.constants.ChatType;
import com.facebook.server.repository.ChatRepository;
import com.facebook.server.repository.MessageRepository;
import com.facebook.server.service.MessageService;
import com.facebook.server.service.UserService;
import com.facebook.server.utils.Pagination;
import com.facebook.server.utils.mapper.MessageMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final ChatRepository chatRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final Pagination pagination;
    private final MessageMapper messageMapper;
    private final UserService userService;

    @Override
    public void sendMessage(SendMessageRequest request) {
        User user = userService.getCurrentAuthenticatedUser();
        Optional<Chat> chat = chatRepository.findById(request.getChatId());

        if (chat.isPresent()) {
            Message message = new Message();
            message.setMessage(request.getText());
            message.setTimestamp(LocalDateTime.now());
            message.setChat(chat.get());
            message.setSender(user);
            Message savedMessage = messageRepository.save(message);

            Chat updateChat = chat.get();
            updateChat.setTimestamp(LocalDateTime.now());
            chatRepository.save(updateChat);

            MessageModel messageModel = messageMapper.mapEntityToModel(savedMessage);

            if (chat.get().getChatType().equals(ChatType.PRIVATE_CHAT)) {
                User otherUser = chat.get().getUsers()
                        .stream()
                        .filter(user1 -> !user1.getUserId().equals(user.getUserId()))
                        .findFirst()
                        .orElse(null);

                if (otherUser != null) {
                    log.info("sending WS chat to {} with payload {}", otherUser.getEmail(), messageModel);
                    try {
                        messagingTemplate.convertAndSendToUser(otherUser.getEmail(), "/chat", messageModel);
                    } catch (Exception e) {
                        log.error("Error sending chat: {}", e.getMessage());
                    }
                }
            }

            this.sendWStoGroupChat(chat.get(), savedMessage, messageModel);

        }
    }

    @Override
    public void sendWStoGroupChat(Chat chat, Message message, MessageModel messageModel) {
        if (chat.getChatType().equals(ChatType.GROUP_CHAT)) {
            log.info("sending WS group chat to {} with payload {}", chat.getGroupChatName(), messageModel);
            try {
                messagingTemplate.convertAndSend("/topic/chat/" + message.getChat().getChatId(), messageModel);
            } catch (Exception e) {
                log.error("Error sending chat: {}", e.getMessage());
            }
        }
    }

    @Override
    public MessageResponse fetchAllChatMessages(Long chatId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Message> messages = messageRepository.findChatMessages(chatId, pageable);
        PageResponse pageResponse = pagination.getPagination(messages);

        List<MessageModel> messageModelList = new ArrayList<>();

        for (Message message : messages) {
            MessageModel messageModel = messageMapper.mapEntityToModel(message);
            messageModelList.add(messageModel);
        }

        return new MessageResponse(messageModelList, pageResponse);
    }

    @Override
    public MessageModel getLastMessage(Long chatId) {
        PageRequest pageRequest = PageRequest.of(0, 1);
        List<Message> messages = messageRepository.findLastMessageByChatId(chatId, pageRequest);
        return messages.stream()
                .findFirst()
                .map(messageMapper::mapEntityToModel)
                .orElse(null);
    }

}
