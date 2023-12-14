import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createLateStory,
  deleteLateStory,
  getLateStoryById,
  searchLateStories,
  updateLateStory,
} from "@/services/late-story.service";

export const CACHE_LATE_STORY = {
  SEARCH: "LATE_STORIES",
  DETAIL: "LATE_STORY_DETAIL",
};

// Get detail
const useGetLateStoryById = ({
  id,
  enabled = true,
  config,
}: {
  id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getLateStoryById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getLateStoryById>>({
    ...config,
    enabled,
    queryKey: [CACHE_LATE_STORY.DETAIL, id],
    queryFn: () => getLateStoryById(id),
  });
};

// Search list
const useSearchLateStories = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchLateStories>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchLateStories>>({
    ...config,
    queryKey: [CACHE_LATE_STORY.SEARCH, params],
    queryFn: () => searchLateStories(params),
  });
};

// Update
const useUpdateLateStory = ({
  config,
}: {
  config?: MutationConfig<typeof updateLateStory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateLateStory,
  });
};

// Create
const useCreateLateStory = ({
  config,
}: {
  config?: MutationConfig<typeof createLateStory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createLateStory,
  });
};

// Delete
const useDeleteLateStory = ({
  config,
}: {
  config?: MutationConfig<typeof deleteLateStory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteLateStory,
  });
};

export {
  useCreateLateStory,
  useDeleteLateStory,
  useGetLateStoryById,
  useSearchLateStories,
  useUpdateLateStory,
};
