package com.facebook.server.dto.response;

import com.facebook.server.dto.model.PostCommentModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostCommentListResponse {

    private List<PostCommentModel> postCommentList;
    private PageResponse pageResponse;
}
