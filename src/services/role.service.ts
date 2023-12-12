import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IBaseDelete } from "@/models/base";
import { IRole } from "@/models/role";

const prefix = "role";

export const getRolesDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/dropdown`);

  return res.data;
};

export const searchRoles = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getRoleById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

  return res.data;
};

export const createRole = async (data: IRole): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateRole = async (data: IRole): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteRole = async (data: IBaseDelete): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete`, {
    data,
  });

  return res.data;
};
