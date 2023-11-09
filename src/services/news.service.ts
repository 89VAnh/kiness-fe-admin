import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IBaseDelete } from "@/models/base";
import { INews } from "@/models/news";

const prefix = "news";

export const getNewsById = async (id: number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

  return res.data;
};

export const createNews = async (data: INews): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateNews = async (data: INews): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteNews = async (data: IBaseDelete): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete`, {
    data,
  });

  return res.data;
};

export const searchNews = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};
