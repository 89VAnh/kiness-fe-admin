import { apiClient } from "@/lib/api";

const prefix = "role-function";

export const createPerFuncForRole = async (data: any): Promise<any> => {
  const res = await apiClient.post(`${prefix}/create`, data);

  return res.data;
};
