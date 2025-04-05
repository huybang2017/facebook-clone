package com.facebook.server.repository;

import org.springframework.stereotype.Repository;

import com.facebook.server.entity.PostVideo;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PostVIdeoRepository extends JpaRepository<PostVideo, String> {

}
