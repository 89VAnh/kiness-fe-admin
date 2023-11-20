import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IBaseDelete } from "@/models/base";
import { IBranch } from "@/models/branch";

const prefix = "branches";

export const searchBranches = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getBranchById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

  return res.data;
};

export const getBranchesDropdown = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/dropdown`, { params });

  return res.data;
};

export const createBranch = async (data: IBranch): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateBranch = async (data: IBranch): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteBranch = async (data: IBaseDelete): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete`, {
    data,
  });

  return res.data;
};
