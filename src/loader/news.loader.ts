import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import { deleteNews, getNewsById, searchNews } from "@/services/news.service";

export const CACHE_NEWS = {
  NEWS: "NEWS",
};

const useGetNewsById = ({
  id,
  config,
}: {
  id: string;
  config?: QueryConfig<typeof getNewsById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getNewsById>>({
    ...config,
    queryKey: [CACHE_NEWS.NEWS, id],
    queryFn: () => getNewsById(id),
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

export { useDeleteNews, useGetNewsById, useSearchNews };
