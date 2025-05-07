package com.facebook.server.utils.mapper;

import com.facebook.server.dto.model.NotificationModel;
import com.facebook.server.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class NotificationMapper {

    private final ModelMapper mapper = new ModelMapper();

    public NotificationModel mapEntityToModel(Notification notification) {
        return mapper.map(notification, NotificationModel.class);
    }

}
