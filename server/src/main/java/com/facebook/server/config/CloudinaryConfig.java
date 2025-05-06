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
                "cloud_name", "drn0gtcvd",
                "api_key", "395813992972329",
                "api_secret", "4cwMqgQE6id8_gOl9UeWkhGpLek",
                "secure", true));
    }
}
