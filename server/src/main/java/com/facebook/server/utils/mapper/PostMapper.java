package com.facebook.server.utils.mapper;

import com.facebook.server.dto.model.PostModel;
import com.facebook.server.entity.Post;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class PostMapper {

    private final ModelMapper mapper = new ModelMapper();

    public PostModel mapEntityToModel(Post post) {
        return mapper.map(post, PostModel.class);
    }

    public Post mapModelToEntity(PostModel postModel) {
        return mapper.map(postModel, Post.class);
    }
}
