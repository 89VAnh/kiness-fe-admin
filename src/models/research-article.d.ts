export interface IResearchArticle {
  article_id: number;
  title: string;
  author: string;
  author_link?: string;
  article_link?: string;
  content?: string;
  issuers?: string;
  year_of_release?: number;
  created_by_user_id?: string;
  lu_user_id?: string;
}
