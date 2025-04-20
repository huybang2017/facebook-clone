package com.facebook.server.dto.request;

import java.util.List;

import com.facebook.server.utils.Enum.StatusPost;
import com.facebook.server.utils.Enum.StatusShow;

import lombok.Data;

@Data
public class PostRequest {
    private String userId;
    private String caption;
    private StatusPost statusPost;
    private StatusShow statusShow;
    private List<String> imageIds;
    private List<String> videoIds;
}
