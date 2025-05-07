package com.facebook.server.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GroupChatRequest {
    @NotNull
    private List<Long> friendId;
    @NotNull
    private String text;
}
