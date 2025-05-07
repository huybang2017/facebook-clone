package com.facebook.server.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AddUserToGroupChatRequest {

    @NotNull
    private List<Long> userId;
}
