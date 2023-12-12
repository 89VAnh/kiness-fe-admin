import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";
import { ILicenseOfInvention } from "@/models/license-of-invention";

const prefix = "license-of-invention";

export const searchLicenses = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const getLicenseOfInventionById = async (
  id: string | number,
): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-detail/${id}`);

  return res.data;
};

export const createLicenseOfInvention = async (
  data: ILicenseOfInvention,
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const updateLicenseOfInvention = async (
  data: ILicenseOfInvention,
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update`, data);

  return res.data;
};

export const deleteLicenseOfInvention = async ({
  id,
  lu_user_id,
}: {
  id: number;
  lu_user_id: string;
}): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/delete`, {
    license_id: id,
    lu_user_id,
  });

  return res.data;
};
