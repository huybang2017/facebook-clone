package com.facebook.server.service.impl;

import com.facebook.server.dto.model.ChatModel;
import com.facebook.server.dto.model.MessageModel;
import com.facebook.server.dto.model.UserDataModel;
import com.facebook.server.dto.request.AddUserToGroupChatRequest;
import com.facebook.server.dto.request.GroupChatNameRequest;
import com.facebook.server.dto.request.GroupChatRequest;
import com.facebook.server.dto.response.ChatIdResponse;
import com.facebook.server.dto.response.ChatResponse;
import com.facebook.server.dto.response.PageResponse;
import com.facebook.server.entity.Chat;
import com.facebook.server.entity.Message;
import com.facebook.server.entity.User;
import com.facebook.server.entity.constants.ChatType;
import com.facebook.server.entity.constants.LeaveReason;
import com.facebook.server.repository.ChatRepository;
import com.facebook.server.repository.MessageRepository;
import com.facebook.server.repository.UserRepository;
import com.facebook.server.service.ChatService;
import com.facebook.server.service.CloudinaryService;
import com.facebook.server.service.MessageService;
import com.facebook.server.service.UserService;
import com.facebook.server.utils.Pagination;
import com.facebook.server.utils.StringUtil;
import com.facebook.server.utils.mapper.ChatMapper;
import com.facebook.server.utils.mapper.MessageMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMapper chatMapper;
    private final Pagination pagination;
    private final MessageRepository messageRepository;
    private final UserService userService;
    private final MessageService messageService;
    private final MessageMapper messageMapper;
    private final CloudinaryService cloudinaryService;

    @Override
    public ChatIdResponse chatUser(Long friendId) {
        User user = userService.getCurrentAuthenticatedUser();
        Optional<Chat> optionalChat = chatRepository.findExistingChat(user.getUserId(), friendId,
                ChatType.PRIVATE_CHAT);
        Chat chat;

        if (optionalChat.isPresent()) {
            chat = optionalChat.get();
        } else {
            User friend = userService.getUserByUserId(friendId);

            Set<User> users = new HashSet<>(Arrays.asList(user, friend));

            chat = new Chat();
            chat.setChatType(ChatType.PRIVATE_CHAT);
            chat.setTimestamp(LocalDateTime.now());
            chat.setUsers(users);
            Chat savedChat = chatRepository.save(chat);

            user.getChats().add(savedChat);
            friend.getChats().add(savedChat);
        }

        ChatIdResponse chatIdResponse = new ChatIdResponse();
        chatIdResponse.setChatId(chat.getChatId());
        return chatIdResponse;
    }

    @Override
    public ChatResponse fetchAllUserChats(Long userId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, StringUtil.TIMESTAMP));
        Page<Chat> chats = chatRepository.findAllUserChats(userId, pageable);
        PageResponse pageResponse = pagination.getPagination(chats);

        List<ChatModel> chatModels = chats.stream()
                .map(chat -> this.mapChatToModel(chat, userId))
                .toList();

        return new ChatResponse(chatModels, pageResponse);
    }

    @Override
    public ChatModel findChatById(Long chatId, Long userId) {
        Chat chat = this.getChat(chatId);
        return this.mapChatToModel(chat, userId);
    }

    @Override
    public ChatIdResponse createGroupChat(GroupChatRequest request) {
        User user = userService.getCurrentAuthenticatedUser();

        request.getFriendId().add(user.getUserId());

        List<User> users = userRepository.findAllById(request.getFriendId());
        Set<User> userSet = new HashSet<>(users);

        Chat chat = new Chat();
        chat.setChatType(ChatType.GROUP_CHAT);
        chat.setTimestamp(LocalDateTime.now());
        chat.setUsers(userSet);
        Chat savedChat = chatRepository.save(chat);

        for (User user1 : userSet) {
            user1.getChats().add(savedChat);
        }

        if (savedChat.getChatId() != null) {
            Message message = new Message();
            message.setMessage(request.getText());
            message.setTimestamp(LocalDateTime.now());
            message.setChat(savedChat);
            message.setSender(user);
            messageRepository.save(message);
        }

        ChatIdResponse chatIdResponse = new ChatIdResponse();
        chatIdResponse.setChatId(savedChat.getChatId());

        return chatIdResponse;
    }

    @Override
    public void uploadGroupChatPhoto(Long chatId, MultipartFile file) {

        if (file == null) {
            throw new IllegalArgumentException("File cannot be null");
        }

        Chat chat = this.getChat(chatId);

        if (chat.getChatType() != ChatType.GROUP_CHAT) {
            throw new IllegalStateException(StringUtil.NOT_GROUP_CHAT);
        }
        String uploadedUrl = cloudinaryService.uploadFile(file);
        chat.setGroupChatImage(uploadedUrl);
        chatRepository.save(chat);

    }

    @Override
    public void updateGroupChatName(GroupChatNameRequest request) {

        if (request.getName() == null) {
            throw new IllegalArgumentException("name cannot be null");
        }

        Chat chat = this.getChat(request.getChatId());

        if (chat.getChatType() != ChatType.GROUP_CHAT) {
            throw new IllegalStateException(StringUtil.NOT_GROUP_CHAT);
        }

        chat.setGroupChatName(request.getName());
        chatRepository.save(chat);
    }

    @Override
    public void addUserToGroupChat(Long chatId, AddUserToGroupChatRequest request) {
        Chat chat = this.getChat(chatId);

        if (chat.getChatType() != ChatType.GROUP_CHAT) {
            throw new IllegalStateException(StringUtil.NOT_GROUP_CHAT);
        }

        if (request.getUserId() == null || request.getUserId().isEmpty()) {
            throw new IllegalArgumentException("User ID list cannot be null or empty");
        }

        for (Long id : request.getUserId()) {
            User user = userService.getUserByUserId(id);

            if (chat.getUsers().contains(user)) {
                throw new IllegalArgumentException("User is already a member of this chat group.");
            }

            chat.getUsers().add(user);
            user.getChats().add(chat);
            String text = "joined the chat";

            Message savedMessage = this.newMessage(text, chat, user);
            MessageModel messageModel = messageMapper.mapEntityToModel(savedMessage);
            messageService.sendWStoGroupChat(chat, savedMessage, messageModel);
        }
        chatRepository.save(chat);

    }

    @Override
    public void leaveGroupChat(Long chatId, Long userId, LeaveReason leaveReason) {
        Chat chat = this.getChat(chatId);

        if (chat.getChatType() != ChatType.GROUP_CHAT) {
            throw new IllegalStateException(StringUtil.NOT_GROUP_CHAT);
        }

        User user = userService.getUserByUserId(userId);

        chat.getUsers().remove(user);
        chatRepository.save(chat);
        user.getChats().remove(chat);
        userRepository.save(user);

        String text = (LeaveReason.LEFT.equals(leaveReason)) ? "left the chat" : "was kicked from the chat";

        Message savedMessage = this.newMessage(text, chat, user);
        MessageModel messageModel = messageMapper.mapEntityToModel(savedMessage);
        messageService.sendWStoGroupChat(chat, savedMessage, messageModel);
    }

    @Override
    public Chat getChat(Long chatId) {
        return chatRepository.findById(chatId)
                .orElseThrow(() -> new NoSuchElementException("Chat not found with ID: " + chatId));
    }

    private Message newMessage(String text, Chat chat, User user) {
        Message message = new Message();
        message.setMessageUpdate(text);
        message.setTimestamp(LocalDateTime.now());
        message.setChat(chat);
        message.setSender(user);
        return messageRepository.save(message);
    }

    private ChatModel mapChatToModel(Chat chat, Long userId) {
        ChatType chatType = chat.getChatType();

        if (chatType.equals(ChatType.GROUP_CHAT)) {
            return chatMapper.mapEntityToModel(chat);
        }

        if (chatType.equals(ChatType.PRIVATE_CHAT)) {
            ChatModel chatModel = new ChatModel();
            chatModel.setChatId(chat.getChatId());
            chatModel.setChatType(chatType);

            User otherUser = chat.getUsers()
                    .stream()
                    .filter(user -> !user.getUserId().equals(userId))
                    .findFirst()
                    .orElse(null);

            if (otherUser != null) {
                UserDataModel userDataModel = new UserDataModel();
                userDataModel.setUserId(otherUser.getUserId());
                userDataModel.setFirstName(otherUser.getFirstName());
                userDataModel.setLastName(otherUser.getLastName());
                userDataModel.setProfilePicture(otherUser.getProfilePicture());

                chatModel.setPrivateChatUser(userDataModel);
            }
            return chatModel;
        }
        return null;
    }
}
