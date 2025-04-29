package com.facebook.server.repository;

import com.facebook.server.entity.Friend;
import com.facebook.server.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, String> {
    boolean existsByUserAndSuggestedFriend(User user, User suggestedFriend);

    Optional<Friend> findByUserAndSuggestedFriend(User user, User suggestedFriend);
}
