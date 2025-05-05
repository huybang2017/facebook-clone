import PageResponse from "./PageResponse";
import { UserData } from "./User";

export enum ChatType {
  PRIVATE_CHAT = "PRIVATE_CHAT",
  GROUP_CHAT = "GROUP_CHAT",
}

export interface ChatModel {
  chatId: number;
  groupChatName?: string;
  groupChatImage?: string;
  chatType: ChatType;
  users?: UserData[];
  privateChatUser?: UserData;
}

export default interface ChatResponse {
  chatModels: ChatModel[];
  pageResponse: PageResponse;
}
