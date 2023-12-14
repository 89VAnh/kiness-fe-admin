import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createObesityStory,
  deleteObesityStory,
  getObesityStoryById,
  searchObesityStories,
  updateObesityStory,
} from "@/services/obesity-story.service";

export const CACHE_OBESITY_STORY = {
  SEARCH: "OBESITY_STORIES",
  DETAIL: "OBESITY_STORY_DETAIL",
};

// Get detail
const useGetObesityStoryById = ({
  id,
  enabled = true,
  config,
}: {
  id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getObesityStoryById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getObesityStoryById>>({
    ...config,
    enabled,
    queryKey: [CACHE_OBESITY_STORY.DETAIL, id],
    queryFn: () => getObesityStoryById(id),
  });
};

// Search list
const useSearchObesityStories = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchObesityStories>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchObesityStories>>({
    ...config,
    queryKey: [CACHE_OBESITY_STORY.SEARCH, params],
    queryFn: () => searchObesityStories(params),
  });
};

// Update
const useUpdateObesityStory = ({
  config,
}: {
  config?: MutationConfig<typeof updateObesityStory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateObesityStory,
  });
};

// Create
const useCreateObesityStory = ({
  config,
}: {
  config?: MutationConfig<typeof createObesityStory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createObesityStory,
  });
};

// Delete
const useDeleteObesityStory = ({
  config,
}: {
  config?: MutationConfig<typeof deleteObesityStory>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteObesityStory,
  });
};

export {
  useCreateObesityStory,
  useDeleteObesityStory,
  useGetObesityStoryById,
  useSearchObesityStories,
  useUpdateObesityStory,
};
