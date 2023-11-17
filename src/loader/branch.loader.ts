import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createBranch,
  deleteBranch,
  getBranchById,
  getBranchesDropdown,
  searchBranches,
  updateBranch,
} from "@/services/branch.service";

export const CACHE_BRANCH = {
  BRANCHES: "BRANCHES",
  DROPDOWN_BRANCH: "DROPDOWN_BRANCH",
};

const useSearchBranches = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchBranches>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchBranches>>({
    ...config,
    queryKey: [CACHE_BRANCH.BRANCHES, params],
    queryFn: () => searchBranches({ params }),
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

const useGetBranchById = ({
  id,
  enabled,
  config,
}: {
  id: number;
  enabled: boolean;
  config?: QueryConfig<typeof getBranchById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getBranchById>>({
    ...config,
    enabled,
    queryKey: [CACHE_BRANCH.BRANCHES, id],
    queryFn: () => getBranchById(id),
  });
};

const useUpdateBranch = ({
  config,
}: {
  config?: MutationConfig<typeof updateBranch>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateBranch,
  });
};

const useDeleteBranch = ({
  config,
}: {
  config?: MutationConfig<typeof deleteBranch>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteBranch,
  });
};

const useCreateBranch = ({
  config,
}: {
  config?: MutationConfig<typeof createBranch>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createBranch,
  });
};

export {
  useBranchDropdown,
  useCreateBranch,
  useDeleteBranch,
  useGetBranchById,
  useSearchBranches,
  useUpdateBranch,
};
