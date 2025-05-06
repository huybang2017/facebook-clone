package com.facebook.server.dto.response;

import com.facebook.server.dto.model.PostImageModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhotoListResponse {

    List<PostImageResponse> postImageModels = new ArrayList<>();
    private PageResponse pageResponse;
}
