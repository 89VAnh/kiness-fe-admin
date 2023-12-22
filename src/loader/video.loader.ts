import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createVideo,
  deleteVideo,
  getVideoById,
  searchVideos,
  updateVideo,
} from "@/services/video.service";

export const CACHE_VIDEO = {
  SEARCH: "VIDEOS",
  DETAIL: "VIDEO_DETAIL",
};

// Get detail
const useGetVideoById = ({
  id,
  enabled = true,
  config,
}: {
  id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getVideoById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getVideoById>>({
    ...config,
    enabled,
    queryKey: [CACHE_VIDEO.DETAIL, id],
    queryFn: () => getVideoById(id),
  });
};

// Search list
const useSearchVideos = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchVideos>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchVideos>>({
    ...config,
    queryKey: [CACHE_VIDEO.SEARCH, params],
    queryFn: () => searchVideos(params),
  });
};

// Update
const useUpdateVideo = ({
  config,
}: {
  config?: MutationConfig<typeof updateVideo>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateVideo,
  });
};

// Create
const useCreateVideo = ({
  config,
}: {
  config?: MutationConfig<typeof createVideo>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createVideo,
  });
};

// Delete
const useDeleteVideo = ({
  config,
}: {
  config?: MutationConfig<typeof deleteVideo>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteVideo,
  });
};

export {
  useCreateVideo,
  useDeleteVideo,
  useGetVideoById,
  useSearchVideos,
  useUpdateVideo,
};
