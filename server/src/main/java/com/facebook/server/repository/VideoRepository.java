package com.facebook.server.repository;

import org.springframework.stereotype.Repository;

import com.facebook.server.entity.Video;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface VideoRepository extends JpaRepository<Video, String> {

}
