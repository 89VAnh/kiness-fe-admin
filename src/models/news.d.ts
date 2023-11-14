export interface INews {
  news_id: number;
  news_title: string;
  content: string;
  content_html: string;
  thumbnail: string;
  views?: number;
  created_by_user_id?: string;
  created_date_time?: Date;
  lu_user_id?: string;
  created_user?: string;
}
