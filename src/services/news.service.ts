import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";

const prefix = "news";

export const getNewsById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

  return res.data;
};

export const deleteNews = async ({
  list_json,
  updated_by_id,
}: {
  list_json: { news_id: number }[];
  updated_by_id: string;
}): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete`, {
    data: { list_json, updated_by_id },
  });

  return res.data;
};

export const searchNews = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};
