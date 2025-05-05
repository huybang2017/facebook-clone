import PageResponse from "./PageResponse";
import { UserData } from "./User";

export enum NotificationType {
  FRIEND_REQUEST = "FRIEND_REQUEST",
  FRIEND_ACCEPTED = "FRIEND_ACCEPTED",
  POST_LIKED = "POST_LIKED",
  POST_COMMENTED = "POST_COMMENTED",
}

export interface NotificationModel {
  notificationId: number;
  message: string;
  timestamp: string;
  notificationType: NotificationType;
  receiverId: number;
  sender: UserData;
  postId: number;
  read: boolean;
  content?: string;
}

export default interface NotificationResponse {
  notificationModels: NotificationModel[];
  pageResponse: PageResponse;
}
