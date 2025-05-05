import { create } from "zustand";

interface ProfileStore {
  isProfile: boolean;
  setIsProfile: (value: boolean) => void;
  isOpenUploadProfile: boolean;
  onOpenUploadProfile: () => void;
  onCloseUploadProfile: () => void;
  isOpenEditProfile: boolean;
  onOpenEditProfile: () => void;
  onCloseEditProfile: () => void;
  imageType: string;
  setImageType: (type: string) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  isProfile: true,
  setIsProfile: (value: boolean) => set({ isProfile: value }),
  isOpenUploadProfile: false,
  onOpenUploadProfile: () => set({ isOpenUploadProfile: true }),
  onCloseUploadProfile: () => set({ isOpenUploadProfile: false }),
  isOpenEditProfile: false,
  onOpenEditProfile: () => set({ isOpenEditProfile: true }),
  onCloseEditProfile: () => set({ isOpenEditProfile: false }),
  imageType: "",
  setImageType: (type: string) => set({ imageType: type }),
}));
