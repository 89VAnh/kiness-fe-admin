import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IRequest } from "@/models/request";

const prefix = "request";

export const getRequestsDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-dropdown`);

  return res.data;
};

export const searchRequests = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getRequestById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-detail/${id}`);

  return res.data;
};

export const createRequest = async (data: IRequest): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateRequest = async (data: IRequest): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteRequest = async (id: string): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete/${id}`);

  return res.data;
};
