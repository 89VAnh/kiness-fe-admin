import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";

const prefix = "customers";

export const getCustomerById = async (id: string | number): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/get-by-id/${id}`);

  return res.data;
};

export const deleteCustomer = async ({
  list_json,
  updated_by_id,
}: {
  list_json: { customer_id: string }[];
  updated_by_id: string;
}): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete`, {
    data: { list_json, updated_by_id },
  });

  return res.data;
};

export const searchCustomers = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};
