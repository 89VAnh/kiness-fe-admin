import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IPage } from "@/models/page";

const prefix = "pages";

export const getPageById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

  return res.data;
};

export const searchPages = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const updatePage = async (data: IPage): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};
