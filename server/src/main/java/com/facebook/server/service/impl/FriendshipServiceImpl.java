package com.facebook.server.service.impl;

import com.facebook.server.dto.model.NotificationModel;
import com.facebook.server.dto.model.UserDataModel;
import com.facebook.server.dto.response.CountResponse;
import com.facebook.server.dto.response.FriendshipStatusResponse;
import com.facebook.server.dto.response.PageResponse;
import com.facebook.server.dto.response.UserListResponse;
import com.facebook.server.entity.Friendship;
import com.facebook.server.entity.Notification;
import com.facebook.server.entity.User;
import com.facebook.server.entity.constants.FriendshipStatus;
import com.facebook.server.entity.constants.NotificationType;
import com.facebook.server.repository.FriendshipRepository;
import com.facebook.server.repository.NotificationRepository;
import com.facebook.server.repository.UserRepository;
import com.facebook.server.service.FriendshipService;
import com.facebook.server.service.NotificationService;
import com.facebook.server.service.UserService;
import com.facebook.server.utils.Pagination;
import com.facebook.server.utils.StringUtil;
import com.facebook.server.utils.mapper.NotificationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class FriendshipServiceImpl implements FriendshipService {

    private final UserRepository userRepository;
    private final FriendshipRepository friendshipRepository;
    private final UserService userService;
    private final Pagination pagination;
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final NotificationService notificationService;

    @Override
    public void addToFriend(Long strangerUserId) {
        User user = userService.getCurrentAuthenticatedUser();
        Optional<Friendship> friendRequest = friendshipRepository.findByFriendship(user.getUserId(), strangerUserId,
                FriendshipStatus.PENDING);
        Optional<Friendship> friendRequestFromOtherUser = friendshipRepository.findByFriendship(strangerUserId,
                user.getUserId(), FriendshipStatus.PENDING);
        if (user.getUserId().equals(strangerUserId)) {
            throw new IllegalArgumentException(StringUtil.FRIEND_REQUEST_NOT_ALLOWED);
        }

        if (friendRequestFromOtherUser.isPresent()) {
            throw new IllegalArgumentException(StringUtil.FRIEND_REQUEST_ALREADY_EXISTS);
        }

        if (friendRequest.isPresent()) {
            friendshipRepository.deleteByUser_UserIdAndFriends_UserId(user.getUserId(), strangerUserId);
            notificationRepository.deleteByNotificationTypeAndSender_UserIdAndReceiver_UserId(
                    NotificationType.FRIEND_REQUEST, user.getUserId(), strangerUserId);
        } else {
            User stranger = userRepository.findById(strangerUserId)
                    .orElseThrow(() -> new NoSuchElementException(StringUtil.USER_NOT_FOUND + strangerUserId));

            Friendship friendship = new Friendship();
            friendship.setUser(user);
            friendship.setFriends(stranger);
            friendship.setStatus(FriendshipStatus.PENDING);
            friendship.setTimestamp(LocalDateTime.now());
            friendshipRepository.save(friendship);

            Notification notification = new Notification();
            notification.setMessage("sent you a friend request.");
            notification.setRead(false);
            notification.setNotificationType(NotificationType.FRIEND_REQUEST);
            notification.setTimestamp(LocalDateTime.now());
            notification.setReceiver(stranger);
            notification.setSender(user);

            Notification savedNotification = notificationRepository.save(notification);

            NotificationModel notificationModel = notificationMapper.mapEntityToModel(savedNotification);
            notificationModel.getSender().setUniqueId(user.getUserId() + 1000);

            notificationService.sendNotification(stranger.getEmail(), notificationModel);
        }
    }

    @Override
    public void acceptFriendRequest(Long strangerUserId) {
        User user = userService.getCurrentAuthenticatedUser();
        User stranger = userService.getUserByUserId(strangerUserId);

        Optional<Friendship> friendRequest = friendshipRepository.findByFriendship(strangerUserId, user.getUserId(),
                FriendshipStatus.PENDING);

        if (friendRequest.isPresent()) {

            friendRequest.get().setStatus(FriendshipStatus.FRIENDS);

            Friendship friendship = new Friendship();
            friendship.setUser(user);
            friendship.setFriends(stranger);
            friendship.setStatus(FriendshipStatus.FRIENDS);
            friendship.setTimestamp(LocalDateTime.now());
            friendshipRepository.save(friendship);

            Notification notification = new Notification();
            notification.setMessage("accepted your friend request.");
            notification.setRead(false);
            notification.setNotificationType(NotificationType.FRIEND_ACCEPTED);
            notification.setTimestamp(LocalDateTime.now());
            notification.setReceiver(stranger);
            notification.setSender(user);

            Notification savedNotification = notificationRepository.save(notification);

            NotificationModel notificationModel = notificationMapper.mapEntityToModel(savedNotification);
            notificationModel.getSender().setUniqueId(user.getUserId() + 1000);

            notificationService.sendNotification(stranger.getEmail(), notificationModel);

            notificationRepository.deleteByNotificationTypeAndSender_UserIdAndReceiver_UserId(
                    NotificationType.FRIEND_REQUEST, strangerUserId, user.getUserId());
        } else {
            throw new NoSuchElementException(StringUtil.FRIEND_REQUEST_NOT_FOUND);
        }
    }

    @Override
    public UserListResponse fetchReceivedFriendRequests(Long userId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, StringUtil.TIMESTAMP));
        // Lấy các yêu cầu mà userId là người nhận (friend_id)
        Page<Friendship> friendships = friendshipRepository.findAllByStatusAndFriends_UserId(
                FriendshipStatus.PENDING,
                userId,
                pageable);
        PageResponse pageResponse = pagination.getPagination(friendships);
        // Lấy thông tin của sender (user_id)
        List<UserDataModel> userDataModels = this.getUserDataModels(friendships);
        return new UserListResponse(userDataModels, pageResponse);
    }

    @Override
    public UserListResponse fetchSentFriendRequests(Long userId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, StringUtil.TIMESTAMP));
        // Lấy các yêu cầu mà userId là người gửi (user_id)
        Page<Friendship> friendships = friendshipRepository.findAllByStatusAndUser_UserId(
                FriendshipStatus.PENDING,
                userId,
                pageable);
        PageResponse pageResponse = pagination.getPagination(friendships);

        // Lấy thông tin của receiver (friend_id)
        List<UserDataModel> userDataModels = this.getFriendsDataModels(friendships);
        return new UserListResponse(userDataModels, pageResponse);
    }

    @Override
    public UserListResponse fetchAllUserFriends(Long userId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, StringUtil.TIMESTAMP));
        Page<Friendship> friendships = friendshipRepository.findAllByStatusAndUser_UserId(FriendshipStatus.FRIENDS,
                userId, pageable);
        PageResponse pageResponse = pagination.getPagination(friendships);

        List<UserDataModel> userDataModels = this.getFriendsDataModels(friendships);
        return new UserListResponse(userDataModels, pageResponse);
    }

    @Override
    public UserListResponse fetchAllFriendSuggestions(Long userid, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<User> userList = friendshipRepository.findFriendSuggestions(userid, pageable);
        PageResponse pageResponse = userService.getUserPagination(userList);
        List<UserDataModel> userDataModels = userService.getUserDataModels(userList);

        return new UserListResponse(userDataModels, pageResponse);
    }

    @Override
    public FriendshipStatusResponse getFriendshipStatus(Long friendId, boolean isRequestStatus) {
        User user = userService.getCurrentAuthenticatedUser();
        Optional<Friendship> friendship;

        if (isRequestStatus) {
            // Trường hợp kiểm tra xem đã là bạn bè chưa
            friendship = friendshipRepository.findByUser_UserIdAndFriends_UserId(user.getUserId(), friendId);

            if (friendship.isPresent() && friendship.get().getStatus() == FriendshipStatus.FRIENDS) {
                return new FriendshipStatusResponse(
                        "Hai bạn đã là bạn bè! Hãy trò chuyện để hiểu nhau hơn.",
                        user.getUserId(),
                        friendId,
                        "FRIENDS");
            }

        } else {
            // Trường hợp kiểm tra yêu cầu kết bạn đang chờ xác nhận
            // TH1: kiểm tra xem mình đã gửi yêu cầu cho người ta chưa
            friendship = friendshipRepository.findByFriendship(user.getUserId(), friendId, FriendshipStatus.PENDING);

            if (friendship.isPresent()) {
                return new FriendshipStatusResponse(
                        "Yêu cầu kết bạn đang chờ xác nhận.",
                        user.getUserId(),
                        friendId,
                        "PENDING");
            }

            // TH2: kiểm tra xem người ta gửi yêu cầu cho mình chưa
            friendship = friendshipRepository.findByFriendship(friendId, user.getUserId(), FriendshipStatus.PENDING);

            if (friendship.isPresent()) {
                return new FriendshipStatusResponse(
                        "Người này đã gửi lời mời kết bạn. Hãy chấp nhận hoặc từ chối!",
                        friendId,
                        user.getUserId(),
                        "PENDING");
            }
        }
        // Nếu không tìm thấy bất kỳ mối quan hệ nào
        return new FriendshipStatusResponse(
                "Không tìm thấy mối quan hệ bạn bè. Hãy gửi lời mời để kết nối!",
                user.getUserId(),
                friendId,
                null);
    }

    @Override
    public void unfriend(Long userId, Long friendId) {

        friendshipRepository.deleteByStatusAndUser_UserIdAndFriends_UserId(FriendshipStatus.FRIENDS, friendId, userId);
        friendshipRepository.deleteByStatusAndUser_UserIdAndFriends_UserId(FriendshipStatus.FRIENDS, userId, friendId);
        notificationRepository.deleteByNotificationTypeAndSender_UserIdAndReceiver_UserId(
                NotificationType.FRIEND_ACCEPTED, friendId, userId);
        notificationRepository.deleteByNotificationTypeAndSender_UserIdAndReceiver_UserId(
                NotificationType.FRIEND_ACCEPTED, userId, friendId);

    }

    @Override
    public void deleteFriendRequest(Long userId, Long strangerId) {
        friendshipRepository.deleteByStatusAndUser_UserIdAndFriends_UserId(FriendshipStatus.PENDING, userId,
                strangerId);
        notificationRepository.deleteByNotificationTypeAndSender_UserIdAndReceiver_UserId(
                NotificationType.FRIEND_REQUEST, userId, strangerId);
    }

    @Override
    public CountResponse getFriendListCount(Long userId) {
        Long count = friendshipRepository.getFriendListCount(userId);

        CountResponse countResponse = new CountResponse();
        countResponse.setCount(count);
        return countResponse;
    }

    private List<UserDataModel> getFriendsDataModels(Page<Friendship> friendships) {
        List<UserDataModel> userDataModels = new ArrayList<>();

        for (Friendship friendship : friendships) {
            UserDataModel userDataModel = new UserDataModel();
            userDataModel.setUniqueId(friendship.getFriendshipId());
            userDataModel.setUserId(friendship.getFriends().getUserId());
            userDataModel.setFirstName(friendship.getFriends().getFirstName());
            userDataModel.setLastName(friendship.getFriends().getLastName());
            userDataModel.setProfilePicture(friendship.getFriends().getProfilePicture());
            userDataModels.add(userDataModel);
        }

        return userDataModels;
    }

    private List<UserDataModel> getUserDataModels(Page<Friendship> friendships) {
        List<UserDataModel> userDataModels = new ArrayList<>();

        for (Friendship friendship : friendships) {
            UserDataModel userDataModel = new UserDataModel();
            userDataModel.setUniqueId(friendship.getFriendshipId());
            userDataModel.setUserId(friendship.getUser().getUserId());
            userDataModel.setFirstName(friendship.getUser().getFirstName());
            userDataModel.setLastName(friendship.getUser().getLastName());
            userDataModel.setProfilePicture(friendship.getUser().getProfilePicture());
            userDataModels.add(userDataModel);
        }
        return userDataModels;
    }

}
