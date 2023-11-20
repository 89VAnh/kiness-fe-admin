import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createBranchRegister,
  deleteBranchRegister,
  printBranchRegister,
  searchBranchRegister,
  updateBranchRegisterStatus,
} from "@/services/branchRegister.service";

export const CACHE_BRANCH_REGISTER = {
  BRANCH_REGISTER: "BRANCH_REGISTER",
};

const useCreateBranchRegister = ({
  config,
}: {
  config?: MutationConfig<typeof createBranchRegister>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createBranchRegister,
  });
};

const useSearchBranchRegister = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchBranchRegister>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchBranchRegister>>({
    ...config,
    queryKey: [CACHE_BRANCH_REGISTER.BRANCH_REGISTER, params],
    queryFn: () => searchBranchRegister(params),
  });
};

const useUpdateBranchRegisterStatus = ({
  config,
}: {
  config?: MutationConfig<typeof updateBranchRegisterStatus>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateBranchRegisterStatus,
  });
};

const useDeleteBranchRegister = ({
  config,
}: {
  config?: MutationConfig<typeof deleteBranchRegister>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteBranchRegister,
  });
};

const usePrintBranchRegister = ({
  config,
}: {
  config?: MutationConfig<typeof printBranchRegister>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: printBranchRegister,
  });
};

export {
  useCreateBranchRegister,
  useDeleteBranchRegister,
  usePrintBranchRegister,
  useSearchBranchRegister,
  useUpdateBranchRegisterStatus,
};
