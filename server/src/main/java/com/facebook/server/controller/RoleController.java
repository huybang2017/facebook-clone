package com.facebook.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.facebook.server.dto.response.BaseResponse;
import com.facebook.server.entity.Role;
import com.facebook.server.service.RoleService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    // Lấy danh sách tất cả roles
    @GetMapping
    public BaseResponse<List<Role>> getAllRoles() {
        List<Role> roles = roleService.getAllRoles();
        return new BaseResponse<>(HttpStatus.OK, "Lấy danh sách roles thành công", roles);
    }

    // Lấy role theo ID
    @GetMapping("/{id}")
    public BaseResponse<Role> getRoleById(@PathVariable String id) {
        Optional<Role> role = roleService.getRoleById(id);
        return role.map(r -> new BaseResponse<>(HttpStatus.OK, "Lấy role thành công", r))
                .orElseGet(() -> new BaseResponse<>(HttpStatus.NOT_FOUND, "Không tìm thấy role", null));
    }

    // Tạo mới role
    @PostMapping
    public BaseResponse<Role> createRole(@RequestBody Role role) {
        Role newRole = roleService.createRole(role.getName());
        return new BaseResponse<>(HttpStatus.CREATED, "Tạo role thành công", newRole);
    }

    // Cập nhật role theo ID
    @PutMapping("/{id}")
    public BaseResponse<Role> updateRole(@PathVariable String id, @RequestBody Role roleDetails) {
        try {
            Role updatedRole = roleService.updateRole(id, roleDetails);
            return new BaseResponse<>(HttpStatus.OK, "Cập nhật role thành công", updatedRole);
        } catch (RuntimeException e) {
            return new BaseResponse<>(HttpStatus.NOT_FOUND, "Không tìm thấy role", null);
        }
    }

    // Xóa role theo ID
    @DeleteMapping("/{id}")
    public BaseResponse<Void> deleteRole(@PathVariable String id) {
        try {
            roleService.deleteRole(id);
            return new BaseResponse<>(HttpStatus.NO_CONTENT, "Xóa role thành công", null);
        } catch (RuntimeException e) {
            return new BaseResponse<>(HttpStatus.NOT_FOUND, "Không tìm thấy role", null);
        }
    }
}
