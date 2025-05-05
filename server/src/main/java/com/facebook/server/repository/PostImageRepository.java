package com.facebook.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.facebook.server.entity.PostImage;

@Repository
public interface PostImageRepository extends JpaRepository<PostImage, Long> {
    @Query("SELECT pi FROM PostImage pi JOIN pi.post p WHERE p.user.id = :userId")
    Page<PostImage> findAllPostImagesByUserId(@Param("userId") Long userId, Pageable pageable);

}
