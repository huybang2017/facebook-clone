import PageResponse from "./PageResponse";
import { UserData } from "./User";

export default interface MessageModel {
  messageId: number;
  message: string;
  messageUpdate: string;
  timestamp: string;
  chatId: number;
  sender: UserData;
}

export default interface MessageResponse {
  messageModels: MessageModel[];
  pageResponse: PageResponse;
}
