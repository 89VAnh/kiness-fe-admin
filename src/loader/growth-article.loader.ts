import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createGrowthArticle,
  deleteGrowthArticle,
  getGrowthArticleById,
  searchGrowthArticles,
  updateGrowthArticle,
} from "@/services/growth-article.service";

export const CACHE_GROWTH_ARTICLE = {
  SEARCH: "GROWTH_ARTICLES",
  DETAIL: "GROWTH_ARTICLE_DETAIL",
};

// Get detail
const useGetGrowthArticleById = ({
  id,
  enabled = true,
  config,
}: {
  id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getGrowthArticleById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getGrowthArticleById>>({
    ...config,
    enabled,
    queryKey: [CACHE_GROWTH_ARTICLE.DETAIL, id],
    queryFn: () => getGrowthArticleById(id),
  });
};

// Search list
const useSearchGrowthArticles = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchGrowthArticles>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchGrowthArticles>>({
    ...config,
    queryKey: [CACHE_GROWTH_ARTICLE.SEARCH, params],
    queryFn: () => searchGrowthArticles(params),
  });
};

// Update
const useUpdateGrowthArticle = ({
  config,
}: {
  config?: MutationConfig<typeof updateGrowthArticle>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateGrowthArticle,
  });
};

// Create
const useCreateGrowthArticle = ({
  config,
}: {
  config?: MutationConfig<typeof createGrowthArticle>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createGrowthArticle,
  });
};

// Delete
const useDeleteGrowthArticle = ({
  config,
}: {
  config?: MutationConfig<typeof deleteGrowthArticle>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteGrowthArticle,
  });
};

export {
  useCreateGrowthArticle,
  useDeleteGrowthArticle,
  useGetGrowthArticleById,
  useSearchGrowthArticles,
  useUpdateGrowthArticle,
};
