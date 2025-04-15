package com.facebook.server.repository;

import com.facebook.server.entity.Icon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IconRepository extends JpaRepository<Icon, String> {
}
