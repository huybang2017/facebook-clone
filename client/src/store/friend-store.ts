import { create } from "zustand";

interface FriendStore {
  isSuggestions: boolean;
  isFriendRequest: boolean;
  isAllFriends: boolean;

  setIsSuggestions: (value: boolean) => void;
  setIsFriendsRequest: (value: boolean) => void;
  setIsAllFriends: (value: boolean) => void;
}

export const useFriendStore = create<FriendStore>((set) => ({
  isSuggestions: false,
  isFriendRequest: false,
  isAllFriends: false,
  setIsSuggestions: (value: boolean) => set({ isSuggestions: value }),
  setIsFriendsRequest: (value: boolean) => set({ isFriendRequest: value }),
  setIsAllFriends: (value: boolean) => set({ isAllFriends: value }),
}));
