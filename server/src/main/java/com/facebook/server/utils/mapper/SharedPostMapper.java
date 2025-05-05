package com.facebook.server.utils.mapper;

import com.facebook.server.dto.response.SharedPostResponse;
import com.facebook.server.entity.Post;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class SharedPostMapper {
    private final ModelMapper mapper = new ModelMapper();

    public SharedPostResponse mapEntityToModel(Post post) {
        return mapper.map(post, SharedPostResponse.class);
    }

    public Post mapModelToEntity(SharedPostResponse sharedPostResponse) {
        return mapper.map(sharedPostResponse, Post.class);
    }

}
