package com.instagram.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagram.server.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
}
