import { apiClient } from "@/lib/api";

const prefix = "cities";

export const getCitiesDropdown = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/dropdown`);

  return res.data;
};
