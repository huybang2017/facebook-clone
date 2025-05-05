import { create } from "zustand";

export interface ArrayItem {
  chatId: number;
  index: number;
  isMaximized: boolean;
}

interface ChatStore {
  chatArray: ArrayItem[];
  setChatArray: (
    updater: ArrayItem[] | ((prev: ArrayItem[]) => ArrayItem[])
  ) => void;
  isNewMessageMaximized: boolean;
  setIsNewMessageMaximized: (value: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatArray: [],
  setChatArray: (updater) =>
    set((state) => ({
      chatArray:
        typeof updater === "function" ? updater(state.chatArray) : updater,
    })),
  isNewMessageMaximized: false,
  setIsNewMessageMaximized: (value: boolean) =>
    set({ isNewMessageMaximized: value }),
}));
