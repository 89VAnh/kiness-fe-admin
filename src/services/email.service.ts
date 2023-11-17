import { apiClient } from "@/lib/api";

const prefix = "email";

interface Props {
  user_name: string;
  password: string;
}

export const sendNotifyRegister = async (data: Props): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/send-register-verify`, data);

  return res.data;
};
