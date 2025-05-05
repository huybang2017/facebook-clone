package com.facebook.server.service.impl;

import com.facebook.server.dto.model.StoryModel;
import com.facebook.server.dto.response.StoryListResponse;
import com.facebook.server.entity.Friendship;
import com.facebook.server.entity.Story;
import com.facebook.server.entity.User;
import com.facebook.server.entity.constants.FriendshipStatus;
import com.facebook.server.repository.StoryRepository;
import com.facebook.server.repository.UserRepository;
import com.facebook.server.service.StoryService;
import com.facebook.server.service.UserService;
import com.facebook.server.utils.mapper.StoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StoryServiceImpl implements StoryService {

    private final StoryRepository storyRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final StoryMapper storyMapper;

    @Override
    public void createStory(String text, MultipartFile file) {
        User user = userService.getCurrentAuthenticatedUser();

        Story story = new Story();
        story.setText(text);
        story.setUser(user);
        if (file != null) {
            story.setStoryImage(userService.processImage(file));
        }
        story.setTimestamp(LocalDateTime.now());

        storyRepository.save(story);
    }

    @Override
    public List<StoryListResponse> fetchAllStories() {
        User currentUser = userService.getCurrentAuthenticatedUser();

        Long currentUserId = currentUser.getUserId();
        List<Long> friendIds = new ArrayList<>();
        friendIds.add(currentUserId);

        for (Friendship friendship : currentUser.getFriends()) {
            if (friendship.getStatus().equals(FriendshipStatus.FRIENDS)) {
                Long friendId = friendship.getFriends().getUserId();
                friendIds.add(friendId);
            }
        }

        List<User> users = userRepository.findUsersById(friendIds);
        List<StoryListResponse> storyListResponses = new ArrayList<>();

        for (User user : users) {
            List<Story> stories = user.getStories();
            if (stories != null && !stories.isEmpty()) {
                StoryListResponse storyListResponse = new StoryListResponse();
                storyListResponse.setUserId(user.getUserId());
                storyListResponse.setProfilePicture(user.getProfilePicture());
                storyListResponse.setFirstName(user.getFirstName());
                storyListResponse.setLastName(user.getLastName());

                List<StoryModel> storyModels = new ArrayList<>();
                for (Story story : stories) {
                    StoryModel storyModel = storyMapper.mapEntityToModel(story);
                    storyModels.add(storyModel);
                }

                storyModels.sort(Comparator.comparing(StoryModel::getTimestamp).reversed());

                storyListResponse.setStoryModels(storyModels);
                storyListResponses.add(storyListResponse);
            }
        }

        return storyListResponses;
    }

    @Override
    public void deleteStory(Long storyId) {
        storyRepository.deleteById(storyId);
    }
}
