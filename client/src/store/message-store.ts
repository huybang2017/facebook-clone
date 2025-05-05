import { create } from "zustand";
import MessageModel from "../entities/Message";

interface MessageStore {
  messagesByChatId: { [chatId: number]: MessageModel[] };
  setMessageModels: (chatId: number, messages: MessageModel[]) => void;
  addMessage: (chatId: number, message: MessageModel) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messagesByChatId: {},

  setMessageModels: (chatId, messages) => {
    set((state) => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [chatId]: messages,
      },
    }));
  },

  addMessage: (chatId, message) => {
    set((state) => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [chatId]: [...(state.messagesByChatId[chatId] || []), message],
      },
    }));
  },
}));
