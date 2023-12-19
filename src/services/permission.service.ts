import { apiClient } from "@/lib/api";

const prefix = "permission";

export const createPermissionForFunction = async (data: any): Promise<any> => {
  const res = await apiClient.post(`${prefix}/create`, data);

  return res.data;
};

export const getPermissionsByFunction = async (params: any): Promise<any> => {
  const res = await apiClient.get(
    `${prefix}/get/${params.role_id}/${params.function_id}`,
  );
  return res.data;
};
