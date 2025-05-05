import { create } from "zustand";

interface PostStore {
  isPostImageModalOpen: boolean;
  setIsPostImageModalOpen: (value: boolean) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  isPostImageModalOpen: false,
  setIsPostImageModalOpen: (value: boolean) =>
    set({ isPostImageModalOpen: value }),
}));
