package com.facebook.server.dto.model;

import com.facebook.server.entity.constants.ChatType;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_DEFAULT)
public class ChatModel {

    private Long chatId;
    private String groupChatName;
    private String groupChatImage;
    @Enumerated(EnumType.STRING)
    private ChatType chatType;
    private List<UserDataModel> users = new ArrayList<>();
    private UserDataModel privateChatUser;
}
