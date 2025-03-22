package com.facebook.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.facebook.server.entity.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, String> {
}
