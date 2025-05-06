package com.facebook.server.dto.response;

import com.facebook.server.dto.model.MessageModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {
    private List<MessageModel> messageModels = new ArrayList<>();
    private PageResponse pageResponse;
}
