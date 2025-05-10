package com.facebook.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.facebook.server.entity.Friendship;
import com.facebook.server.entity.User;
import com.facebook.server.entity.constants.FriendshipStatus;

import java.util.Optional;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

        @Query("SELECT f FROM Friendship f WHERE f.user.userId = :userId AND f.friends.userId = :strangerId AND f.status = :status")
        Optional<Friendship> findByFriendship(@Param("userId") Long userId,
                        @Param("strangerId") Long strangerId,
                        @Param("status") FriendshipStatus status);

        void deleteByUser_UserIdAndFriends_UserId(Long userId, Long strangerId);

        Page<Friendship> findAllByStatusAndFriends_UserId(FriendshipStatus status, Long userId, Pageable pageable);

        Page<Friendship> findAllByStatusAndUser_UserId(FriendshipStatus status, Long userId, Pageable pageable);

        Optional<Friendship> findByUser_UserIdAndFriends_UserId(Long userId, Long friendId);

        @Query("SELECT COUNT(f) FROM Friendship f WHERE f.user.userId =:userId AND f.status = 'FRIENDS'")
        Long getFriendListCount(@Param("userId") Long userId);

        @Query("SELECT u FROM User u WHERE u.userId != :userId " +
                        "AND u.userId NOT IN (SELECT f.friends.userId FROM Friendship f WHERE f.user.userId = :userId AND f.status = 'FRIENDS') "
                        +
                        "AND u.userId NOT IN (SELECT f.friends.userId FROM Friendship f WHERE f.user.userId = :userId AND f.status = 'PENDING')")
        Page<User> findFriendSuggestions(@Param("userId") Long userId, Pageable pageable);

        void deleteByStatusAndUser_UserIdAndFriends_UserId(FriendshipStatus status, Long userId, Long friendId);

}
