import { apiClient } from "@/lib/api";

const prefix = "dashboard";

export const getCountCustomer = async (user_id: string): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/count-customer`, {
    params: { user_id },
  });

  return res.data;
};
export const getCountExperienceRegister = async (
  user_id: string,
): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/count-experience-register`, {
    params: { user_id },
  });

  return res.data;
};
export const getCountTestRegister = async (user_id: string): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/count-test-register`, {
    params: { user_id },
  });

  return res.data;
};
export const getCountBranchRegister = async (user_id: string): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/count-branch-register`, {
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
export const getCountNews = async (user_id: string): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/count-news`, {
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
