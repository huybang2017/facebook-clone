package com.facebook.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.facebook.server.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
}
