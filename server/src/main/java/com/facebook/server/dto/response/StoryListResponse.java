package com.facebook.server.dto.response;

import com.facebook.server.dto.model.StoryModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoryListResponse {

    private Long userId;
    private String profilePicture;
    private String firstName;
    private String lastName;
    private List<StoryModel> storyModels;

}
