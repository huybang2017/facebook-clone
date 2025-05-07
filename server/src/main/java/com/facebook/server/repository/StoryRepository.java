package com.facebook.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.facebook.server.entity.Story;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
}
