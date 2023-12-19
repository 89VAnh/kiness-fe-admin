import { IBaseData } from "./base";

export interface IHistory extends IBaseData {
  history_id: number;
  year: number;
  content: string;
  sort_order: number;
}
