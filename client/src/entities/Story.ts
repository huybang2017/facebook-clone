import { UserData } from "./User";

export interface StoryModel {
  storyId: number;
  text?: string;
  storyImage?: string;
  timestamp: string;
}

export interface StoryResponse extends UserData {
  storyModels: StoryModel[];
}
