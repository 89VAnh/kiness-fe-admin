import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createNews,
  deleteNews,
  getNewsById,
  searchNews,
  updateNews,
} from "@/services/news.service";

export const CACHE_NEWS = {
  NEWS: "NEWS",
};

const useGetNewsById = ({
  id,
  enabled = true,
  config,
}: {
  id: number;
  enabled: boolean;
  config?: QueryConfig<typeof getNewsById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getNewsById>>({
    ...config,
    enabled,
    queryKey: [CACHE_NEWS.NEWS, id],
    queryFn: () => getNewsById(id),
  });
};
// Create
const useCreateNews = ({
  config,
}: {
  config?: MutationConfig<typeof createNews>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createNews,
  });
};

// Update
const useUpdateNews = ({
  config,
}: {
  config?: MutationConfig<typeof updateNews>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateNews,
  });
};

const useDeleteNews = ({
  config,
}: {
  config?: MutationConfig<typeof deleteNews>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteNews,
  });
};

const useSearchNews = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchNews>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchNews>>({
    ...config,
    queryKey: [CACHE_NEWS.NEWS, params],
    queryFn: () => searchNews(params),
  });
};

export {
  useCreateNews,
  useDeleteNews,
  useGetNewsById,
  useSearchNews,
  useUpdateNews,
};
