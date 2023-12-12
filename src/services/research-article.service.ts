import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IBaseDelete } from "@/models/base";
import { IResearchArticle } from "@/models/research-article";

const prefix = "research-article";

export const getResearchArticleById = async (id: number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

  return res.data;
};

export const createResearchArticle = async (
  data: IResearchArticle,
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateResearchArticle = async (
  data: IResearchArticle,
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteResearchArticle = async (
  data: IBaseDelete,
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/delete`, {
    data,
  });

  return res.data;
};

export const searchResearchArticle = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};
