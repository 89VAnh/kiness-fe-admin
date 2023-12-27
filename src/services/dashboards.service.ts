import { apiClient } from "@/lib/api";

const prefix = "dashboard";

export const getCountExperienceRegister = async (
  user_id: string,
): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/count-experience-register`, {
    params: { user_id },
  });

  return res.data;
};

export const getCountEmployee = async (user_id: string): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/count-employee`, {
    params: { user_id },
  });

  return res.data;
};

export const getCountBranch = async (user_id: string): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/count-branch`, {
    params: { user_id },
  });

  return res.data;
};

export const getCountRequest = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/count-request`, {});

  return res.data;
};

export const getStatisticExperience = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/statistic-experience`, {});

  return res.data;
};
