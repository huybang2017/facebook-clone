package com.facebook.server.controller;

import com.facebook.server.dto.model.MessageModel;
import com.facebook.server.dto.request.SendMessageRequest;
import com.facebook.server.dto.response.MessageResponse;
import com.facebook.server.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat/message")
@RequiredArgsConstructor
public class MessageController {
  private final MessageService messageService;

  @PostMapping
  public void sendMessage(@RequestBody @Valid SendMessageRequest request) {
    messageService.sendMessage(request);
  }

  @GetMapping("/{chatId}")
  public MessageResponse fetchAllChatMessages(@PathVariable("chatId") Long chatId,
      @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
      @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
    return messageService.fetchAllChatMessages(chatId, pageNo, pageSize);
  }

  @GetMapping("/last/{chatId}")
  public MessageModel getLastMessage(@PathVariable("chatId") Long chatId) {
    return messageService.getLastMessage(chatId);
  }
}
