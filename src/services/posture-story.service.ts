import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IPostureStory } from "@/models/posture-story";

const prefix = "posture-story";

export const getPostureStoriesDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-dropdown`);

  return res.data;
};

export const searchPostureStories = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getPostureStoryById = async (
  id: string | number,
): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-detail/${id}`);

  return res.data;
};

export const createPostureStory = async (data: IPostureStory): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updatePostureStory = async (data: IPostureStory): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deletePostureStory = async (id: string): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete/${id}`);

  return res.data;
};
