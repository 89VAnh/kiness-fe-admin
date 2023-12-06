import { useQuery } from "react-query";

import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import {
  getCountBranch,
  getCountBranchRegister,
  getCountCustomer,
  getCountEmployee,
  getCountExperienceRegister,
  getCountNews,
  getCountTestRegister,
} from "@/services/dashboards.service";

export const CACHE_DASHBOARD = {
  DASHBOARD_CUSTOMER: "DASHBOARD_CUSTOMER",
  DASHBOARD_EMPLOYEE: "DASHBOARD_EMPLOYEE",
  DASHBOARD_TEST: "DASHBOARD_TEST",
  DASHBOARD_EXPERIENCE: "DASHBOARD_EXPERIENCE",
  DASHBOARD_BRANCH: "DASHBOARD_BRANCH",
  DASHBOARD_NEWS: "DASHBOARD_NEWS",
};

const useGetCountCustomer = ({
  user_id,
  enabled = true,
  config,
}: {
  user_id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getCountCustomer>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getCountCustomer>>({
    ...config,
    enabled,
    queryKey: [CACHE_DASHBOARD.DASHBOARD_CUSTOMER, user_id],
    queryFn: () => getCountCustomer(user_id),
  });
};

const useGetCountEmployee = ({
  user_id,
  enabled = true,
  config,
}: {
  user_id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getCountEmployee>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getCountEmployee>>({
    ...config,
    enabled,
    queryKey: [CACHE_DASHBOARD.DASHBOARD_EMPLOYEE],
    queryFn: () => getCountEmployee(user_id),
  });
};

const useGetCountTestRegister = ({
  user_id,
  enabled = true,
  config,
}: {
  user_id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getCountTestRegister>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getCountTestRegister>>({
    ...config,
    enabled,
    queryKey: [CACHE_DASHBOARD.DASHBOARD_TEST],
    queryFn: () => getCountTestRegister(user_id),
  });
};

const useGetCountExperienceRegister = ({
  user_id,
  enabled = true,
  config,
}: {
  user_id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getCountExperienceRegister>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getCountExperienceRegister>>({
    ...config,
    enabled,
    queryKey: [CACHE_DASHBOARD.DASHBOARD_EXPERIENCE],
    queryFn: () => getCountExperienceRegister(user_id),
  });
};

const useGetCountBranchRegister = ({
  user_id,
  enabled = true,
  config,
}: {
  user_id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getCountBranchRegister>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getCountBranchRegister>>({
    ...config,
    enabled,
    queryKey: [CACHE_DASHBOARD.DASHBOARD_BRANCH],
    queryFn: () => getCountBranchRegister(user_id),
  });
};

const useGetCountNews = ({
  user_id,
  enabled = true,
  config,
}: {
  user_id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getCountNews>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getCountNews>>({
    ...config,
    enabled,
    queryKey: [CACHE_DASHBOARD.DASHBOARD_NEWS],
    queryFn: () => getCountNews(user_id),
  });
};

const useGetCountBranch = ({
  user_id,
  enabled = true,
  config,
}: {
  user_id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getCountBranch>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getCountBranch>>({
    ...config,
    enabled,
    queryKey: [CACHE_DASHBOARD.DASHBOARD_BRANCH],
    queryFn: () => getCountBranch(user_id),
  });
};

export {
  useGetCountBranch,
  useGetCountBranchRegister,
  useGetCountCustomer,
  useGetCountEmployee,
  useGetCountExperienceRegister,
  useGetCountNews,
  useGetCountTestRegister,
};
