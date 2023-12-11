import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createArticleAuthor,
  deleteArticleAuthor,
  getArticleAuthorById,
  getArticleAuthorsDropdown,
  searchArticleAuthor,
  updateArticleAuthor,
} from "@/services/article-author.service";

export const CACHE_ARTICLE_AUTHOR = {
  SEARCH: "ARTICLE_AUTHORS",
  DETAIL: "ARTICLE_AUTHOR_DETAIL",
  DROPDOWN: "ARTICLE_AUTHOR_DROPDOWN",
};

const useGetArticleAuthorById = ({
  id,
  enabled = true,
  config,
}: {
  id: number;
  enabled: boolean;
  config?: QueryConfig<typeof getArticleAuthorById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getArticleAuthorById>>({
    ...config,
    enabled,
    queryKey: [CACHE_ARTICLE_AUTHOR.DETAIL, id],
    queryFn: () => getArticleAuthorById(id),
  });
};

// Create
const useCreateArticleAuthor = ({
  config,
}: {
  config?: MutationConfig<typeof createArticleAuthor>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createArticleAuthor,
  });
};

// Update
const useUpdateArticleAuthor = ({
  config,
}: {
  config?: MutationConfig<typeof updateArticleAuthor>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateArticleAuthor,
  });
};

const useDeleteArticleAuthor = ({
  config,
}: {
  config?: MutationConfig<typeof deleteArticleAuthor>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteArticleAuthor,
  });
};

const useSearchArticleAuthor = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchArticleAuthor>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchArticleAuthor>>({
    ...config,
    queryKey: [CACHE_ARTICLE_AUTHOR.SEARCH, params],
    queryFn: () => searchArticleAuthor(params),
  });
};

const useArticleAuthorDropdown = ({
  config,
}: {
  config?: QueryConfig<typeof getArticleAuthorsDropdown>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getArticleAuthorsDropdown>>({
    ...config,
    queryKey: [CACHE_ARTICLE_AUTHOR.DROPDOWN],
    queryFn: () => getArticleAuthorsDropdown(),
  });
};

export {
  useArticleAuthorDropdown,
  useCreateArticleAuthor,
  useDeleteArticleAuthor,
  useGetArticleAuthorById,
  useSearchArticleAuthor,
  useUpdateArticleAuthor,
};
