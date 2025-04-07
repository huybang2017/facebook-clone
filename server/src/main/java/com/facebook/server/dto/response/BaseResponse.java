package com.facebook.server.dto.response;

import org.springframework.http.HttpStatus;

public class BaseResponse<T> {
    private int status;
    private String message;
    private T data;

    public BaseResponse(HttpStatus status, String message, T data) {
        this.status = status.value();
        this.message = message;
        this.data = data;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }
}
