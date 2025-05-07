package com.facebook.server.utils.mapper;

import com.facebook.server.dto.model.ChatModel;
import com.facebook.server.entity.Chat;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ChatMapper {

    private final ModelMapper mapper = new ModelMapper();

    public ChatModel mapEntityToModel(Chat chat) {
        return mapper.map(chat, ChatModel.class);
    }
}
