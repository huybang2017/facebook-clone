package com.instagram.server.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagram.server.entity.Image;


@Repository
public interface ImageRepository extends JpaRepository<Image, String> {
}
