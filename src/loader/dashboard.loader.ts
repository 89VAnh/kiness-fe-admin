import { useQuery } from "react-query";

import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import {
  getCountBranch,
  getCountEmployee,
  getCountExperienceRegister,
  getCountRequest,
} from "@/services/dashboards.service";

export const CACHE_DASHBOARD = {
  DASHBOARD_CUSTOMER: "DASHBOARD_CUSTOMER",
  DASHBOARD_EMPLOYEE: "DASHBOARD_EMPLOYEE",
  DASHBOARD_TEST: "DASHBOARD_TEST",
  DASHBOARD_EXPERIENCE: "DASHBOARD_EXPERIENCE",
  DASHBOARD_BRANCH: "DASHBOARD_BRANCH",
  DASHBOARD_NEWS: "DASHBOARD_NEWS",
  DASHBOARD_REQUEST: "DASHBOARD_REQUEST",
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

const useGetCountRequest = ({
  enabled = true,
  config,
}: {
  enabled?: boolean;
  config?: QueryConfig<typeof getCountRequest>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getCountRequest>>({
    ...config,
    enabled,
    queryKey: [CACHE_DASHBOARD.DASHBOARD_REQUEST],
    queryFn: () => getCountRequest(),
  });
};

export {
  useGetCountBranch,
  useGetCountEmployee,
  useGetCountExperienceRegister,
  useGetCountRequest,
};
