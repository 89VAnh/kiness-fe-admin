import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createFaqTopic,
  deleteFaqTopic,
  getFaqTopicById,
  getFaqTopicsDropdown,
  searchFaqTopics,
  updateFaqTopic,
} from "@/services/faq-topic.service";

export const CACHE_FAQ_TOPIC = {
  SEARCH: "FAQ_TOPICS",
  DETAIL: "FAQ_TOPIC_DETAIL",
  DROPDOWN: "FAQ_TOPICS_DROPDOWN",
};

const useFaqTopicDropdown = ({
  config,
}: {
  config?: QueryConfig<typeof getFaqTopicsDropdown>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getFaqTopicsDropdown>>({
    ...config,
    queryKey: [CACHE_FAQ_TOPIC.DROPDOWN],
    queryFn: () => getFaqTopicsDropdown(),
  });
};

// Get detail
const useGetFaqTopicById = ({
  id,
  enabled = true,
  config,
}: {
  id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getFaqTopicById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getFaqTopicById>>({
    ...config,
    enabled,
    queryKey: [CACHE_FAQ_TOPIC.DETAIL, id],
    queryFn: () => getFaqTopicById(id),
  });
};

// Search list
const useSearchFaqTopics = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchFaqTopics>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchFaqTopics>>({
    ...config,
    queryKey: [CACHE_FAQ_TOPIC.SEARCH, params],
    queryFn: () => searchFaqTopics(params),
  });
};

// Update
const useUpdateFaqTopic = ({
  config,
}: {
  config?: MutationConfig<typeof updateFaqTopic>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateFaqTopic,
  });
};

// Create
const useCreateFaqTopic = ({
  config,
}: {
  config?: MutationConfig<typeof createFaqTopic>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createFaqTopic,
  });
};

// Delete
const useDeleteFaqTopic = ({
  config,
}: {
  config?: MutationConfig<typeof deleteFaqTopic>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteFaqTopic,
  });
};

export {
  useFaqTopicDropdown,
  useCreateFaqTopic,
  useDeleteFaqTopic,
  useGetFaqTopicById,
  useSearchFaqTopics,
  useUpdateFaqTopic,
};
