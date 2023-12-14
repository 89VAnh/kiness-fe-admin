import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createPostureStory,
  deletePostureStory,
  getPostureStoryById,
  searchPostureStories,
  updatePostureStory,
} from "@/services/posture-story.service";

export const CACHE_POSTURE_STORY = {
  SEARCH: "POSTURE_STORIES",
  DETAIL: "POSTURE_STORY_DETAIL",
};

// Get detail
const useGetPostureStoryById = ({
  id,
  enabled = true,
  config,
}: {
  id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getPostureStoryById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getPostureStoryById>>({
    ...config,
    enabled,
    queryKey: [CACHE_POSTURE_STORY.DETAIL, id],
    queryFn: () => getPostureStoryById(id),
  });
};

// Search list
const useSearchPostureStories = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchPostureStories>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchPostureStories>>({
    ...config,
    queryKey: [CACHE_POSTURE_STORY.SEARCH, params],
    queryFn: () => searchPostureStories(params),
  });
};

// Update
const useUpdatePostureStory = ({
  config,
}: {
  config?: MutationConfig<typeof updatePostureStory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updatePostureStory,
  });
};

// Create
const useCreatePostureStory = ({
  config,
}: {
  config?: MutationConfig<typeof createPostureStory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createPostureStory,
  });
};

// Delete
const useDeletePostureStory = ({
  config,
}: {
  config?: MutationConfig<typeof deletePostureStory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deletePostureStory,
  });
};

export {
  useCreatePostureStory,
  useDeletePostureStory,
  useGetPostureStoryById,
  useSearchPostureStories,
  useUpdatePostureStory,
};
