import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { IBaseDelete } from "@/models/base";
import { IDiagram } from "@/models/diagram";

const prefix = "diagram";

export const getDiagramsDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-dropdown`);

  return res.data;
};

export const searchDiagrams = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getDiagramById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/getbyid/${id}`);

  return res.data;
};

export const createDiagram = async (data: IDiagram): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateDiagram = async (data: IDiagram): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteDiagram = async (data: IBaseDelete): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/delete`, data);

  return res.data;
};
