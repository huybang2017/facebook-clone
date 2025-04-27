package com.facebook.server.entity.dto.request;

import com.facebook.server.utils.Enum.StatusPost;
import com.facebook.server.utils.Enum.StatusShow;

import lombok.Data;

@Data
public class PostRequest {
    private String caption;
    private StatusPost statusPost;
    private StatusShow statusShow;
    private String userId;
}
