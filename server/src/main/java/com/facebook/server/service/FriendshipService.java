package com.facebook.server.service;

import com.facebook.server.dto.response.CountResponse;
import com.facebook.server.dto.response.FriendshipStatusResponse;
import com.facebook.server.dto.response.UserListResponse;

public interface FriendshipService {

    void addToFriend(Long strangerUserId);

    void acceptFriendRequest(Long strangerUserId);

    UserListResponse fetchReceivedFriendRequests(Long userId, int pageNo, int pageSize);

    UserListResponse fetchSentFriendRequests(Long userId, int pageNo, int pageSize);

    UserListResponse fetchAllUserFriends(Long userId, int pageNo, int pageSize);

    UserListResponse fetchAllFriendSuggestions(Long userid, int pageNo, int pageSize);

    FriendshipStatusResponse getFriendshipStatus(Long friendId, boolean isRequestStatus);

    void unfriend(Long userId, Long friendId);

    void deleteFriendRequest(Long userId, Long strangerId);

    CountResponse getFriendListCount(Long userId);

}
