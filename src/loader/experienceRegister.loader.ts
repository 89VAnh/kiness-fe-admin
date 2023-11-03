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
} from "@/services/experienceRegister.service";

export const CACHE_EXPERIENCE_REGISTER = {
  EXPERIENCE_REGISTER: "EXPERIENCE_REGISTER",
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
    queryKey: [CACHE_EXPERIENCE_REGISTER.EXPERIENCE_REGISTER, params],
    queryFn: () => searchExperienceRegister(params),
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
};
