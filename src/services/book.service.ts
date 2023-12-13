import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IBook } from "@/models/book";

const prefix = "book";

export const searchBooks = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getBookById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-detail/${id}`);

  return res.data;
};

export const createBook = async (data: IBook): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateBook = async (data: IBook): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteBook = async ({
  id,
  lu_user_id,
}: {
  id: number;
  lu_user_id: string;
}): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/delete`, {
    book_id: id,
    lu_user_id,
  });

  return res.data;
};
