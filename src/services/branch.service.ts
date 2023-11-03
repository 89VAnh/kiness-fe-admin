import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";

const prefix = "branches";

export const getBranches = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getBranchesDropdown = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/dropdown`, { params });

  return res.data;
};

export const createTestRegister = async (data: any): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create-test-register`, data);

  return res.data;
};
