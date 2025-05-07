package com.facebook.server.dto.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
  private String errorMessage;
}
