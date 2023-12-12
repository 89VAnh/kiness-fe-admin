import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IGrowthStory } from "@/models/growth-story";

const prefix = "growth-story";

export const getGrowthStoriesDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-dropdown`);

  return res.data;
};

export const searchGrowthStories = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getGrowthStoryById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-detail/${id}`);

  return res.data;
};

export const createGrowthStory = async (data: IGrowthStory): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateGrowthStory = async (data: IGrowthStory): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteGrowthStory = async (id: string): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete/${id}`);

  return res.data;
};
