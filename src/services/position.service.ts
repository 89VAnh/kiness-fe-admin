import { apiClient } from "@/lib/api";

const prefix = "positions";

export const getPositionsDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/dropdown`);

  return res.data;
};
