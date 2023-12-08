import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createResearcher,
  deleteResearcher,
  getResearcherById,
  searchResearcher,
  updateResearcher,
} from "@/services/researcher.service";

export const CACHE_RESEARCHER = {
  RESEARCHER: "RESEARCHER",
};

const useGetResearcherById = ({
  id,
  enabled = true,
  config,
}: {
  id: number;
  enabled: boolean;
  config?: QueryConfig<typeof getResearcherById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getResearcherById>>({
    ...config,
    enabled,
    queryKey: [CACHE_RESEARCHER.RESEARCHER, id],
    queryFn: () => getResearcherById(id),
  });
};

// Create
const useCreateResearcher = ({
  config,
}: {
  config?: MutationConfig<typeof createResearcher>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createResearcher,
  });
};

// Update
const useUpdateResearcher = ({
  config,
}: {
  config?: MutationConfig<typeof updateResearcher>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateResearcher,
  });
};

const useDeleteResearcher = ({
  config,
}: {
  config?: MutationConfig<typeof deleteResearcher>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteResearcher,
  });
};

const useSearchResearcher = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchResearcher>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchResearcher>>({
    ...config,
    queryKey: [CACHE_RESEARCHER.RESEARCHER, params],
    queryFn: () => searchResearcher(params),
  });
};

export {
  useCreateResearcher,
  useDeleteResearcher,
  useGetResearcherById,
  useSearchResearcher,
  useUpdateResearcher,
};
