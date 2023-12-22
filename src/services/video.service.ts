import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IVideo } from "@/models/video";

const prefix = "video";

export const getVideosDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-dropdown`);

  return res.data;
};

export const searchVideos = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getVideoById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-detail/${id}`);

  return res.data;
};

export const createVideo = async (data: IVideo): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateVideo = async (data: IVideo): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteVideo = async (id: string): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete/${id}`);

  return res.data;
};
