import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IBaseDelete } from "@/models/base";
import { IPosition } from "@/models/position";

const prefix = "positions";

export const getPositionsDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/dropdown`);

  return res.data;
};

export const getPositionById = async (id: number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

  return res.data;
};

export const createPosition = async (data: IPosition): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updatePosition = async (data: IPosition): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deletePosition = async (data: IBaseDelete): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete`, {
    data,
  });

  return res.data;
};

export const searchPosition = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};
