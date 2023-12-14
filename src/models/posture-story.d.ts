import { IBaseData } from "./base";

export interface IPostureStory extends IBaseData {
  posture_story_id: string;
  title: string;
  content: string;
  image_link: string;
  posted_date: string;
  author_name: string;
  view_count: number;
  is_draft: number;
}
