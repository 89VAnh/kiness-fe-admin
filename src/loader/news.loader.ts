import { AxiosRequestConfig } from "axios";
import { useQuery } from "react-query";

import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { getNewsById, searchNews } from "@/services/news.service";

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

export { useSearchNews, useGetNewsById };
