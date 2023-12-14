import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { ILateStory } from "@/models/late-story";

const prefix = "late-story";

export const getLateStoriesDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-dropdown`);

  return res.data;
};

export const searchLateStories = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getLateStoryById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-detail/${id}`);

  return res.data;
};

export const createLateStory = async (data: ILateStory): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateLateStory = async (data: ILateStory): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteLateStory = async (id: string): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete/${id}`);

  return res.data;
};
