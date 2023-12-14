import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IObesityStory } from "@/models/obesity-story";

const prefix = "obesity-story";

export const getObesityStoriesDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-dropdown`);

  return res.data;
};

export const searchObesityStories = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getObesityStoryById = async (
  id: string | number,
): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-detail/${id}`);

  return res.data;
};

export const createObesityStory = async (data: IObesityStory): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateObesityStory = async (data: IObesityStory): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteObesityStory = async (id: string): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete/${id}`);

  return res.data;
};
