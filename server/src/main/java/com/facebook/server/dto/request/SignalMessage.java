package com.facebook.server.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignalMessage {
    private String type;
    private String senderId;
    private String receiverId;
    private Object offer;
    private Object answer;
    private Object candidate;
}
