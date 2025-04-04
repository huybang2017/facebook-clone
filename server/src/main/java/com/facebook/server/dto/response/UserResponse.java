package com.facebook.server.dto.response;

import java.time.LocalDateTime;
import java.util.Set;
import com.facebook.server.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String id;
    private String email;
    private String name;
    private LocalDateTime birthday;
    private String linkSocialMedia;
    private String bio;
    private String image;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Set<Role> roles;
}
