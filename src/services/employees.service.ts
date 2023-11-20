import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IBaseDelete } from "@/models/base";
import { IEmployee } from "@/models/employee";

const prefix = "employees";

export const getEmployeeById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

  return res.data;
};

export const createEmployee = async (data: IEmployee): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateEmployee = async (data: IEmployee): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteEmployee = async (data: IBaseDelete): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/delete`, data);

  return res.data;
};

export const searchEmployees = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};
