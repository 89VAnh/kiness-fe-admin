import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createGrowthStory,
  deleteGrowthStory,
  getGrowthStoryById,
  searchGrowthStories,
  updateGrowthStory,
} from "@/services/growth-story.service";

export const CACHE_GROWTH_STORY = {
  SEARCH: "GROWTH_STORIES",
  DETAIL: "GROWTH_STORY_DETAIL",
};

// Get detail
const useGetGrowthStoryById = ({
  id,
  enabled = true,
  config,
}: {
  id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getGrowthStoryById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getGrowthStoryById>>({
    ...config,
    enabled,
    queryKey: [CACHE_GROWTH_STORY.DETAIL, id],
    queryFn: () => getGrowthStoryById(id),
  });
};

// Search list
const useSearchGrowthStories = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchGrowthStories>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchGrowthStories>>({
    ...config,
    queryKey: [CACHE_GROWTH_STORY.SEARCH, params],
    queryFn: () => searchGrowthStories(params),
  });
};

// Update
const useUpdateGrowthStory = ({
  config,
}: {
  config?: MutationConfig<typeof updateGrowthStory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateGrowthStory,
  });
};

// Create
const useCreateGrowthStory = ({
  config,
}: {
  config?: MutationConfig<typeof createGrowthStory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createGrowthStory,
  });
};

// Delete
const useDeleteGrowthStory = ({
  config,
}: {
  config?: MutationConfig<typeof deleteGrowthStory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteGrowthStory,
  });
};

export {
  useCreateGrowthStory,
  useDeleteGrowthStory,
  useGetGrowthStoryById,
  useSearchGrowthStories,
  useUpdateGrowthStory,
};
