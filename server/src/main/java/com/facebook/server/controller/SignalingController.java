package com.facebook.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.facebook.server.dto.request.SignalMessage;

@Controller()
public class SignalingController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/offer")
    public void sendOffer(@Payload SignalMessage message) {
        messagingTemplate.convertAndSend("/topic/" + message.getReceiverId(), message);
    }

    @MessageMapping("/answer")
    public void sendAnswer(@Payload SignalMessage message) {
        messagingTemplate.convertAndSend("/topic/" + message.getReceiverId(), message);
    }

    @MessageMapping("/ice")
    public void sendIceCandidate(@Payload SignalMessage message) {
        messagingTemplate.convertAndSend("/topic/" + message.getReceiverId(), message);
    }
}
