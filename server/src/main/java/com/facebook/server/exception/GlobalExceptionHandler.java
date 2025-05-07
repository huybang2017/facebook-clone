package com.facebook.server.exception;

import jakarta.persistence.EntityExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<String> handleBadCredentialsException(BadCredentialsException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(EntityExistsException.class)
  public ResponseEntity<String> handleEntityExistsException(Exception e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> exceptionHandler(MethodArgumentNotValidException err) {
    Map<String, String> errors = new HashMap<>();
    err.getBindingResult().getAllErrors().forEach((error) -> {
      if (error instanceof FieldError) {
        String fieldName = ((FieldError) error).getField();
        String errorMessage = error.getDefaultMessage();
        errors.put(fieldName, errorMessage);
      } else if (error instanceof ObjectError) {
        String objectName = ((ObjectError) error).getObjectName();
        String errorMessage = error.getDefaultMessage();
        errors.put(objectName, errorMessage);
      }
    });
    return ResponseEntity.badRequest().body(errors);
  }

  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<String> handleIllegalStateException(IllegalStateException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handleGeneralException(Exception e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
