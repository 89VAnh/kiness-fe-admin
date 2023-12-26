import { IBaseData } from "./base";

export interface IVideo extends IBaseData {
  video_id: string;
  video_name: string;
  video_code: string;
  is_foreign: boolean;
}
