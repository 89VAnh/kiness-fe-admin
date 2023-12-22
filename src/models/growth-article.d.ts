import { IBaseData } from "./base";

export interface IGrowthArticle extends IBaseData {
  growth_article_id: string;
  title: string;
  content: string;
  image_link: string;
  posted_date: Date;
  author_name: string;
  view_count: number;
  is_draft: boolean;
}
