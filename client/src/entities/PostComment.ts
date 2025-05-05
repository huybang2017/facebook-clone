import PageResponse from "./PageResponse";
import { UserData } from "./User";

export interface PostComment extends UserData {
  postCommentId: number;
  comment: string;
  commentImage: string;
  timestamp: string;
}

export default interface PostCommentListResponse {
  postCommentList: PostComment[];
  pageResponse: PageResponse;
}
