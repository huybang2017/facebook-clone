package com.facebook.server.dto.response;

import com.facebook.server.dto.model.ChatModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatResponse {
    private List<ChatModel> chatModels = new ArrayList<>();
    private PageResponse pageResponse;
}
