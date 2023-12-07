import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createFaq,
  deleteFaq,
  getFaqById,
  searchFaqs,
  updateFaq,
} from "@/services/faq.service";

export const CACHE_FAQ = {
  SEARCH: "FAQS",
  DETAIL: "FAQ_DETAIL",
};

// Get detail
const useGetFaqById = ({
  id,
  enabled = true,
  config,
}: {
  id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getFaqById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getFaqById>>({
    ...config,
    enabled,
    queryKey: [CACHE_FAQ.DETAIL, id],
    queryFn: () => getFaqById(id),
  });
};

// Search list
const useSearchFaqs = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchFaqs>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchFaqs>>({
    ...config,
    queryKey: [CACHE_FAQ.SEARCH, params],
    queryFn: () => searchFaqs(params),
  });
};

// Update
const useUpdateFaq = ({
  config,
}: {
  config?: MutationConfig<typeof updateFaq>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateFaq,
  });
};

// Create
const useCreateFaq = ({
  config,
}: {
  config?: MutationConfig<typeof createFaq>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createFaq,
  });
};

// Delete
const useDeleteFaq = ({
  config,
}: {
  config?: MutationConfig<typeof deleteFaq>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteFaq,
  });
};

export {
  useCreateFaq,
  useDeleteFaq,
  useGetFaqById,
  useSearchFaqs,
  useUpdateFaq,
};
