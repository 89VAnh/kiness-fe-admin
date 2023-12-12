import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IArticleAuthor } from "@/models/article-author";
import { IBaseDelete } from "@/models/base";

const prefix = "article-author";

export const getArticleAuthorsDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-dropdown`);

  return res.data;
};

export const getArticleAuthorById = async (id: number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

  return res.data;
};

export const createArticleAuthor = async (
  data: IArticleAuthor,
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateArticleAuthor = async (
  data: IArticleAuthor,
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteArticleAuthor = async (data: IBaseDelete): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/delete`, {
    data,
  });

  return res.data;
};

export const searchArticleAuthor = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};
