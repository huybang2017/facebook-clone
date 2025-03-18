package com.instagram.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagram.server.entity.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {
}
