import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IBaseDelete } from "@/models/base";
import { IFunction } from "@/models/function";

const prefix = "function";

export const getFunctionsDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-dropdown`);

  return res.data;
};

export const searchFunctions = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getFunctionById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/getbyid/${id}`);

  return res.data;
};

export const getFunctionByRole = async (id: string): Promise<any> => {
  const res = await apiClient.get(`${prefix}/getbyrole/` + id);
  return res.data;
};

export const createFunction = async (data: IFunction): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateFunction = async (data: IFunction): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteFunction = async (data: IBaseDelete): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/delete`, data);

  return res.data;
};
