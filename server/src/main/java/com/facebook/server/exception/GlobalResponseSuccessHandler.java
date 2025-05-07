package com.facebook.server.exception;

import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@ControllerAdvice
public class GlobalResponseSuccessHandler implements ResponseBodyAdvice<Object> {

  @Override

  public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {

    return true;

  }

  @Override

  public Object beforeBodyWrite(

      Object body,

      MethodParameter returnType,

      MediaType selectedContentType,

      Class<? extends HttpMessageConverter<?>> selectedConverterType,

      ServerHttpRequest request,

      ServerHttpResponse response) {

    // Nếu là lỗi (status >= 400) thì không wrap

    if (response instanceof ServletServerHttpResponse) {

      int status = ((ServletServerHttpResponse) response).getServletResponse().getStatus();

      if (status >= 400) {

        return body;

      }

    }

    // Nếu đã là BaseResponse thì không wrap lại

    if (body instanceof BaseResponse) {

      return body;

    }

    // Trường hợp body là String phải trả JSON thủ công

    if (body instanceof String) {

      return "{\"status\":200,\"message\":\"Success\",\"data\":\"" + body + "\"}";

    }

    // Wrap các loại dữ liệu khác

    return new BaseResponse<>(HttpStatus.OK, "Success", body);

  }

}
