package com.facebook.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dby5fniv0",
                "api_key", "282769453523895",
                "api_secret", "BA5GxdmxYwiUL8YwWOH5RwnNmMQ",
                "secure", true));
    }
}
