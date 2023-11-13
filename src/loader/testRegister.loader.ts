import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createTestRegister,
  deleteTestRegister,
  printTestRegister,
  searchTestRegister,
  updateTestRegisterStatus,
} from "@/services/testRegister.service";

export const CACHE_TEST_REGISTER = {
  TEST_REGISTER: "TEST_REGISTER",
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

const useSearchTestRegister = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchTestRegister>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchTestRegister>>({
    ...config,
    queryKey: [CACHE_TEST_REGISTER.TEST_REGISTER, params],
    queryFn: () => searchTestRegister(params),
  });
};

const useUpdateTestRegisterStatus = ({
  config,
}: {
  config?: MutationConfig<typeof updateTestRegisterStatus>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateTestRegisterStatus,
  });
};

const useDeleteTestRegister = ({
  config,
}: {
  config?: MutationConfig<typeof deleteTestRegister>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteTestRegister,
  });
};

const usePrintTestRegister = ({
  config,
}: {
  config?: MutationConfig<typeof printTestRegister>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: printTestRegister,
  });
};

export {
  useCreateTestRegister,
  useDeleteTestRegister,
  usePrintTestRegister,
  useSearchTestRegister,
  useUpdateTestRegisterStatus,
};
