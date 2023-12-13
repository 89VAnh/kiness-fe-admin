import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IBookAuthor } from "@/models/book-author";

const prefix = "book-author";

export const searchBookAuthors = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getBookAuthorById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-detail/${id}`);

  return res.data;
};

export const getBookAuthorDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-dropdown`);

  return res.data;
};

export const createBookAuthor = async (data: IBookAuthor): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateBookAuthor = async (data: IBookAuthor): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteBookAuthor = async ({
  id,
  lu_user_id,
}: {
  id: number;
  lu_user_id: string;
}): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/delete`, {
    author_id: id,
    lu_user_id,
  });

  return res.data;
};
