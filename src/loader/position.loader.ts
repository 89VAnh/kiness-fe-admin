import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createPosition,
  deletePosition,
  getPositionById,
  getPositionsDropdown,
  searchPosition,
  updatePosition,
} from "@/services/position.service";

export const CACHE_POSITION = {
  DROPDOWN_POSITION: "DROPDOWN_POSITION",
  POSITION: "POSITION",
};

const usePositionDropdown = ({
  config,
}: {
  config?: QueryConfig<typeof getPositionsDropdown>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getPositionsDropdown>>({
    ...config,
    queryKey: [CACHE_POSITION.DROPDOWN_POSITION],
    queryFn: () => getPositionsDropdown(),
  });
};
const useGetPositionById = ({
  id,
  enabled = true,
  config,
}: {
  id: number;
  enabled: boolean;
  config?: QueryConfig<typeof getPositionById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getPositionById>>({
    ...config,
    enabled,
    queryKey: [CACHE_POSITION.POSITION, id],
    queryFn: () => getPositionById(id),
  });
};

// Create
const useCreatePosition = ({
  config,
}: {
  config?: MutationConfig<typeof createPosition>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createPosition,
  });
};

// Update
const useUpdatePosition = ({
  config,
}: {
  config?: MutationConfig<typeof updatePosition>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updatePosition,
  });
};

const useDeletePosition = ({
  config,
}: {
  config?: MutationConfig<typeof deletePosition>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deletePosition,
  });
};

const useSearchPosition = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchPosition>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchPosition>>({
    ...config,
    queryKey: [CACHE_POSITION.POSITION, params],
    queryFn: () => searchPosition(params),
  });
};

export {
  useCreatePosition,
  useDeletePosition,
  useGetPositionById,
  usePositionDropdown,
  useSearchPosition,
  useUpdatePosition,
};
