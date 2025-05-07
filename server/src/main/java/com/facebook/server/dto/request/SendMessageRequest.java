package com.facebook.server.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SendMessageRequest {
    @NotNull
    private Long chatId;
    @NotNull
    private String text;
}
