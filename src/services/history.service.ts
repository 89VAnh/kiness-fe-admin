import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IHistory } from "@/models/history";

const prefix = "history";

export const searchHistories = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getHistoryDetail = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-detail/${id}`);

  return res.data;
};

export const createHistory = async (data: IHistory): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateHistory = async (data: IHistory): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteHistory = async ({
  id,
  lu_user_id,
}: {
  id: number;
  lu_user_id: string;
}): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/delete`, { id, lu_user_id });

  return res.data;
};
