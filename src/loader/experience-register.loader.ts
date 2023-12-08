import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createExperienceRegister,
  deleteExperienceRegister,
  printExperienceRegister,
  searchExperienceRegister,
  updateExperienceRegisterStatus,
} from "@/services/experience-register.service";

export const CACHE_EXPERIENCE_REGISTER = {
  SEARCH: "EXPERIENCE_REGISTERS",
};

const useCreateExperienceRegister = ({
  config,
}: {
  config?: MutationConfig<typeof createExperienceRegister>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createExperienceRegister,
  });
};

const useSearchExperienceRegister = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchExperienceRegister>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchExperienceRegister>>({
    ...config,
    queryKey: [CACHE_EXPERIENCE_REGISTER.SEARCH, params],
    queryFn: () => searchExperienceRegister(params),
  });
};

const useUpdateExperienceRegisterStatus = ({
  config,
}: {
  config?: MutationConfig<typeof updateExperienceRegisterStatus>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateExperienceRegisterStatus,
  });
};

const useDeleteExperienceRegister = ({
  config,
}: {
  config?: MutationConfig<typeof deleteExperienceRegister>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteExperienceRegister,
  });
};

const usePrintExperienceRegister = ({
  config,
}: {
  config?: MutationConfig<typeof printExperienceRegister>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: printExperienceRegister,
  });
};

export {
  useCreateExperienceRegister,
  useDeleteExperienceRegister,
  usePrintExperienceRegister,
  useSearchExperienceRegister,
  useUpdateExperienceRegisterStatus,
};
