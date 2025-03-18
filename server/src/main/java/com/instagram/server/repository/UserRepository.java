package com.instagram.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagram.server.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}
