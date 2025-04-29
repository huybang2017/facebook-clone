package com.facebook.server.service;

import com.facebook.server.dto.request.FriendRequest;
import com.facebook.server.dto.response.FriendResponse;
import com.facebook.server.entity.Friend;
import com.facebook.server.entity.User;
import com.facebook.server.repository.FriendRepository;
import com.facebook.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendService {

        private final FriendRepository friendRepository;
        private final UserRepository userRepository;

        // 1. Gửi lời mời kết bạn
        public FriendResponse createFriend(FriendRequest request) {
                User user = userRepository.findById(request.getUserId())
                                .orElseThrow(() -> new RuntimeException("User not found"));

                User suggestedFriend = userRepository.findById(request.getSuggestedFriendId())
                                .orElseThrow(() -> new RuntimeException("Suggested friend not found"));

                // Check đã kết bạn chưa
                if (friendRepository.existsByUserAndSuggestedFriend(user, suggestedFriend)) {
                        throw new RuntimeException("Already friends");
                }

                Friend friend = new Friend();
                friend.setUser(user);
                friend.setSuggestedFriend(suggestedFriend);
                friend.setReason(request.getReason());

                Friend saved = friendRepository.save(friend);

                FriendResponse response = new FriendResponse();
                response.setId(saved.getId());
                response.setUser(saved.getUser());
                response.setSuggestedFriend(saved.getSuggestedFriend());
                response.setReason(saved.getReason());
                response.setCreatedAt(saved.getCreatedAt());

                return response;
        }

        // 2. Hủy kết bạn (cả chiều ngược)
        public void unfriend(String userId, String suggestedFriendId) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                User suggestedFriend = userRepository.findById(suggestedFriendId)
                                .orElseThrow(() -> new RuntimeException("Suggested friend not found"));

                Optional<Friend> existing = friendRepository.findByUserAndSuggestedFriend(user, suggestedFriend);
                existing.ifPresent(friendRepository::delete);
        }

        // 3. Kiểm tra đã là bạn bè chưa
        public boolean isFriend(String userId, String suggestedFriendId) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                User suggestedFriend = userRepository.findById(suggestedFriendId)
                                .orElseThrow(() -> new RuntimeException("Suggested friend not found"));

                return friendRepository.existsByUserAndSuggestedFriend(user, suggestedFriend);
        }
}
