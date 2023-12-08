export interface IResearcher {
  researcher_id: number;
  name: string;
  position_id?: number;
  image_url?: string;
  story?: string;
  paper?: string;
  degree?: string;
  created_user?: string;
  created_by_user_id: string;
  created_date_time?: Date;
  lu_user_id?: string;
}
