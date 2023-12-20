import { IBaseData } from "./base";

export interface IAction extends IBaseData {
  action_code: string;
  function_id: string;
  action_name: string;
  description: string;
}
