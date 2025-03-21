package com.instagram.server.dto.request;

import com.instagram.server.utils.Enum.StatusPost;
import com.instagram.server.utils.Enum.StatusShow;
import lombok.Data;

@Data
public class PostRequest {
    private String caption;
    private StatusPost statusPost;
    private StatusShow statusShow;
    private String userId;
}
