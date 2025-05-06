package com.facebook.server.utils.mapper;

import com.facebook.server.dto.model.StoryModel;
import com.facebook.server.entity.Story;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class StoryMapper {

    private final ModelMapper mapper = new ModelMapper();

    public StoryModel mapEntityToModel(Story story) {
        return mapper.map(story, StoryModel.class);
    }
}
