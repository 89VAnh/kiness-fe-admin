import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";

const prefix = "experience-register";

export const createExperienceRegister = async (data: any): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const searchExperienceRegister = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const updateExperienceRegisterStatus = async (data: {
  register_id: number;
  status: number;
  lu_user_id: string;
}): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update-status`, data);

  return res.data;
};

export const deleteExperienceRegister = async ({
  list_json,
  lu_user_id,
}: {
  list_json: { register_id: number }[];
  lu_user_id: string;
}): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete`, {
    data: { list_json, lu_user_id },
  });

  return res.data;
};

export const printExperienceRegister = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/print`, params, {
    responseType: "blob",
  });

  if (res.data.type !== "application/json") {
    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: res.headers["content-type"] }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Danh sách đơn đăng ký trải nghiệm`);
    document.body.appendChild(link);
    link.click();
  }

  return res.data;
};
