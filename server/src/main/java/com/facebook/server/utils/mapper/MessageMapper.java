package com.facebook.server.utils.mapper;

import com.facebook.server.dto.model.MessageModel;
import com.facebook.server.entity.Message;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MessageMapper {

    private final ModelMapper mapper = new ModelMapper();

    public MessageModel mapEntityToModel(Message message) {
        return mapper.map(message, MessageModel.class);
    }
}
