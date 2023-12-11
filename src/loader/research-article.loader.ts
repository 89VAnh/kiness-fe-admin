import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createResearchArticle,
  deleteResearchArticle,
  getResearchArticleById,
  searchResearchArticle,
  updateResearchArticle,
} from "@/services/research-article.service";

export const CACHE_RESEARCH_ARTICLE = {
  SEARCH: "RESEARCH_ARTICLES",
  DETAIL: "RESEARCH_ARTICLE_DETAIL",
};

const useGetResearchArticleById = ({
  id,
  enabled = true,
  config,
}: {
  id: number;
  enabled: boolean;
  config?: QueryConfig<typeof getResearchArticleById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getResearchArticleById>>({
    ...config,
    enabled,
    queryKey: [CACHE_RESEARCH_ARTICLE.DETAIL, id],
    queryFn: () => getResearchArticleById(id),
  });
};

// Create
const useCreateResearchArticle = ({
  config,
}: {
  config?: MutationConfig<typeof createResearchArticle>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createResearchArticle,
  });
};

// Update
const useUpdateResearchArticle = ({
  config,
}: {
  config?: MutationConfig<typeof updateResearchArticle>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateResearchArticle,
  });
};

const useDeleteResearchArticle = ({
  config,
}: {
  config?: MutationConfig<typeof deleteResearchArticle>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteResearchArticle,
  });
};

const useSearchResearchArticle = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchResearchArticle>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchResearchArticle>>({
    ...config,
    queryKey: [CACHE_RESEARCH_ARTICLE.SEARCH, params],
    queryFn: () => searchResearchArticle(params),
  });
};

export {
  useCreateResearchArticle,
  useDeleteResearchArticle,
  useGetResearchArticleById,
  useSearchResearchArticle,
  useUpdateResearchArticle,
};
