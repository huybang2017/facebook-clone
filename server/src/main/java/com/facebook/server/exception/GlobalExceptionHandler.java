package com.facebook.server.exception;

import com.facebook.server.dto.response.ErrorResponse;

import jakarta.persistence.EntityExistsException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@ControllerAdvice
public class GlobalExceptionHandler {

  private ErrorResponse buildError(HttpServletRequest request, HttpStatus status, Object message) {
    return new ErrorResponse(message.toString()); // Trả về ErrorResponse với thông điệp lỗi
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException e,
      HttpServletRequest request) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(buildError(request, HttpStatus.UNAUTHORIZED, e.getMessage()));
  }

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException e,
      HttpServletRequest request) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(buildError(request, HttpStatus.UNAUTHORIZED, e.getMessage()));
  }

  @ExceptionHandler(EntityExistsException.class)
  public ResponseEntity<ErrorResponse> handleEntityExistsException(EntityExistsException e,
      HttpServletRequest request) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(buildError(request, HttpStatus.CONFLICT, e.getMessage()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException err,
      HttpServletRequest request) {
    Map<String, String> errors = new HashMap<>();
    err.getBindingResult().getAllErrors().forEach(error -> {
      if (error instanceof FieldError fieldError) {
        errors.put(fieldError.getField(), error.getDefaultMessage());
      } else if (error instanceof ObjectError objectError) {
        errors.put(objectError.getObjectName(), objectError.getDefaultMessage());
      }
    });
    return ResponseEntity.badRequest().body(buildError(request, HttpStatus.BAD_REQUEST, errors));
  }

  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<ErrorResponse> handleNoSuchElementException(NoSuchElementException e,
      HttpServletRequest request) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(buildError(request, HttpStatus.NOT_FOUND, e.getMessage()));
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException e,
      HttpServletRequest request) {
    return ResponseEntity.badRequest()
        .body(buildError(request, HttpStatus.BAD_REQUEST, e.getMessage()));
  }

  @ExceptionHandler(MaxUploadSizeExceededException.class)
  public ResponseEntity<ErrorResponse> handleImageMaxSizeException(MaxUploadSizeExceededException e,
      HttpServletRequest request) {
    return ResponseEntity.badRequest()
        .body(buildError(request, HttpStatus.BAD_REQUEST, "File size exceeded"));
  }

  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<ErrorResponse> handleIllegalStateException(IllegalStateException e,
      HttpServletRequest request) {
    return ResponseEntity.badRequest()
        .body(buildError(request, HttpStatus.BAD_REQUEST, e.getMessage()));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleGeneralException(Exception e,
      HttpServletRequest request) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(buildError(request, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
  }
}
