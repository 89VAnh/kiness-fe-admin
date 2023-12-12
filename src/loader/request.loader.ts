import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createRequest,
  deleteRequest,
  getRequestById,
  searchRequests,
  updateRequest,
} from "@/services/request.service";

export const CACHE_REQUEST = {
  SEARCH: "REQUESTS",
  DETAIL: "REQUEST",
};

// Get detail
const useGetRequestById = ({
  id,
  enabled = true,
  config,
}: {
  id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getRequestById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getRequestById>>({
    ...config,
    enabled,
    queryKey: [CACHE_REQUEST.DETAIL, id],
    queryFn: () => getRequestById(id),
  });
};

// Search list
const useSearchRequests = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchRequests>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchRequests>>({
    ...config,
    queryKey: [CACHE_REQUEST.SEARCH, params],
    queryFn: () => searchRequests(params),
  });
};

// Update
const useUpdateRequest = ({
  config,
}: {
  config?: MutationConfig<typeof updateRequest>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateRequest,
  });
};

// Create
const useCreateRequest = ({
  config,
}: {
  config?: MutationConfig<typeof createRequest>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createRequest,
  });
};

// Delete
const useDeleteRequest = ({
  config,
}: {
  config?: MutationConfig<typeof deleteRequest>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteRequest,
  });
};

export {
  useCreateRequest,
  useDeleteRequest,
  useGetRequestById,
  useSearchRequests,
  useUpdateRequest,
};
