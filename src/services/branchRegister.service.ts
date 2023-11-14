import { AxiosRequestConfig } from "axios";

import { apiClient } from "@/lib/api";

const prefix = "branch-register";

export const createBranchRegister = async (data: any): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/create`, data);

  return res.data;
};

export const searchBranchRegister = async (
  params: AxiosRequestConfig["params"],
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/search`, params);

  return res.data;
};

export const updateBranchRegisterStatus = async (data: {
  register_id: number;
  status: number;
  lu_user_id: string;
}): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/update-status`, data);

  return res.data;
};

export const deleteBranchRegister = async ({
  list_json,
  updated_by_id,
}: {
  list_json: { register_id: number }[];
  updated_by_id: string;
}): Promise<any> => {
  const res = await apiClient?.delete(`${prefix}/delete`, {
    data: { list_json, updated_by_id },
  });

  return res.data;
};

export const printBranchRegister = async (
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
