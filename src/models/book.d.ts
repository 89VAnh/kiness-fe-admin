import { IBaseData } from "./base";

export interface IBook extends IBaseData {
  book_id: number;
  title: string;
  image_url?: string;
  author_id?: number;
  publication_date?: Date;
}
