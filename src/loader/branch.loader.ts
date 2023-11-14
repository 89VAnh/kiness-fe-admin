import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createTestRegister,
  getBranches,
  getBranchesDropdown,
} from "@/services/branch.service";

export const CACHE_BRANCH = {
  BRANCHES: "BRANCHES",
  DROPDOWN_BRANCH: "DROPDOWN_BRANCH",
  EXPERIENCE_REGISTER: "EXPERIENCE_REGISTER",
};

const useBranches = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof getBranches>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getBranches>>({
    ...config,
    queryKey: [CACHE_BRANCH.BRANCHES, params],
    queryFn: () => getBranches({ params }),
  });
};

const useBranchDropdown = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof getBranchesDropdown>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getBranchesDropdown>>({
    ...config,
    queryKey: [CACHE_BRANCH.DROPDOWN_BRANCH, params],
    queryFn: () => getBranchesDropdown({ params }),
  });
};

const useCreateTestRegister = ({
  config,
}: {
  config?: MutationConfig<typeof createTestRegister>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createTestRegister,
  });
};

export { useBranchDropdown, useBranches, useCreateTestRegister };
