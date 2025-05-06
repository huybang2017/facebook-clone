package com.facebook.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.facebook.server.entity.PostImageComments;

@Repository
public interface PostImageCommentsRepository extends JpaRepository<PostImageComments, Long> {
    Page<PostImageComments> findAllByPostImage_PostImageId(Long postImageId, Pageable pageable);

    @Query("SELECT COUNT(c) FROM PostImageComments c WHERE c.postImage.postImageId = :postImageId")
    Long countPostImageComments(@Param("postImageId") Long postImageId);
}
