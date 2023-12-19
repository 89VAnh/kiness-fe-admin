export interface IBaseDelete {
  list_json: {}[];
  lu_user_id: string;
}

export interface IBaseData {
  active_flag: number;
  created_by_user_id: string;
  created_user: string;
  created_date_time: Date;
  lu_updated: Date;
  lu_user_id: string;
}
