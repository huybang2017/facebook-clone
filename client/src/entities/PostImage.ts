import PageResponse from "./PageResponse";

export default interface PostImage {
  postImageId: number;
  postImageUrl: string;
  timestamp: string;
}

export interface Images extends PostImage {
  postId: number;
}

export default interface PhotoListResponse {
  postImageModels: Images[];
  pageResponse: PageResponse;
}
