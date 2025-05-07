package com.facebook.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.facebook.server.entity.PostImageLikes;

import java.util.Optional;

@Repository
public interface PostImageLikesRepository extends JpaRepository<PostImageLikes, Long> {

    Optional<PostImageLikes> findByPostImage_PostImageIdAndUser_UserId(Long postImageId, Long userId);

    void deleteByPostImage_PostImageIdAndUser_UserId(Long postImageId, Long userId);

    Page<PostImageLikes> findAllByPostImage_PostImageId(Long postImageId, Pageable pageable);

    @Query("SELECT COUNT(c) FROM PostImageLikes c WHERE c.postImage.postImageId = :postImageId")
    Long countPostImageLike(@Param("postImageId") Long postImageId);
}
