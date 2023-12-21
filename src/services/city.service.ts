import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IBaseDelete } from "@/models/base";
import { ICity } from "@/models/city";

const prefix = "cities";

export const getCitiesDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/dropdown`);

  return res.data;
};

export const searchCities = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getCityById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

  return res.data;
};

export const createCity = async (data: ICity): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateCity = async (data: ICity): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteCity = async (data: IBaseDelete): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/delete`, {
    data,
  });

  return res.data;
};
