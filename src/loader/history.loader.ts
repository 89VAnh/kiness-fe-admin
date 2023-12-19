import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createHistory,
  deleteHistory,
  getHistoryDetail,
  searchHistories,
  updateHistory,
} from "@/services/history.service";

export const CACHE_HISTORY = {
  SEARCH: "HISTORYIES",
  DETAIL: "HISTORY",
};

// Get detail
const useGetHistoryDetail = ({
  id,
  enabled = true,
  config,
}: {
  id: number;
  enabled?: boolean;
  config?: QueryConfig<typeof getHistoryDetail>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getHistoryDetail>>({
    ...config,
    enabled,
    queryKey: [CACHE_HISTORY.DETAIL, id],
    queryFn: () => getHistoryDetail(id),
  });
};

// Search list
const useSearchHistories = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchHistories>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchHistories>>({
    ...config,
    queryKey: [CACHE_HISTORY.SEARCH, params],
    queryFn: () => searchHistories(params),
  });
};

// Update
const useUpdateHistory = ({
  config,
}: {
  config?: MutationConfig<typeof updateHistory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateHistory,
  });
};

// Create
const useCreateHistory = ({
  config,
}: {
  config?: MutationConfig<typeof createHistory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createHistory,
  });
};

// Delete
const useDeleteHistory = ({
  config,
}: {
  config?: MutationConfig<typeof deleteHistory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteHistory,
  });
};

export {
  useCreateHistory,
  useDeleteHistory,
  useGetHistoryDetail,
  useSearchHistories,
  useUpdateHistory,
};
