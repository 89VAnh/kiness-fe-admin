import { apiClient } from "@/lib/api";

const prefix = "core";

export const uploadFile = async (data: any): Promise<any> => {
  const result = await apiClient.post(`${prefix}/upload`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result.data;
};

export const deleteFile = async (data: { filePath: string }): Promise<any> => {
  const result = await apiClient.post(`${prefix}/delete-file`, data);

  return result.data;
};
