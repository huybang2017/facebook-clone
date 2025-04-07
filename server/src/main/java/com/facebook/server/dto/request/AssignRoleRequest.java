package com.facebook.server.dto.request;

import lombok.Data;

@Data
public class AssignRoleRequest {
    private String email;
    private String role;

    public AssignRoleRequest() {
    }

    public AssignRoleRequest(String email, String role) {
        this.email = email;
        this.role = role;
    }

}
