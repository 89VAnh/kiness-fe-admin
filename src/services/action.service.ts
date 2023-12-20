import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IAction } from "@/models/action";
import { IBaseDelete } from "@/models/base";

const prefix = "action";

export const getActionsDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-dropdown`);

  return res.data;
};

export const searchActions = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getActionById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/getbyid/${id}`);

  return res.data;
};

export const createAction = async (data: IAction): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateAction = async (data: IAction): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteAction = async (data: IBaseDelete): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/delete`, data);

  return res.data;
};
