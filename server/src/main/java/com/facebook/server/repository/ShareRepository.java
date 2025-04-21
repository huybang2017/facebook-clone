package com.facebook.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.facebook.server.entity.Share;

@Repository
public interface ShareRepository extends JpaRepository<Share, String> {
}
