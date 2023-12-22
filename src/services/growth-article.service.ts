import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IGrowthArticle } from "@/models/growth-article";

const prefix = "growth-article";

export const getGrowthArticlesDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-dropdown`);

  return res.data;
};

export const searchGrowthArticles = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getGrowthArticleById = async (
  id: string | number,
): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-detail/${id}`);

  return res.data;
};

export const createGrowthArticle = async (
  data: IGrowthArticle,
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateGrowthArticle = async (
  data: IGrowthArticle,
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteGrowthArticle = async (id: string): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete/${id}`);

  return res.data;
};
