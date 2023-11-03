import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import { getPageById, searchPages, updatePage } from "@/services/pages.service";

export const CACHE_PAGES = {
  PAGES: "PAGES",
};

const useGetPageById = ({
  id,
  enabled = true,
  config,
}: {
  id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getPageById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getPageById>>({
    ...config,
    enabled,
    queryKey: [CACHE_PAGES.PAGES, id],
    queryFn: () => getPageById(id),
  });
};

const useSearchPages = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchPages>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchPages>>({
    ...config,
    queryKey: [CACHE_PAGES.PAGES, params],
    queryFn: () => searchPages(params),
  });
};

const useUpdatePage = ({
  config,
}: {
  config?: MutationConfig<typeof updatePage>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updatePage,
  });
};

export { useSearchPages, useGetPageById, useUpdatePage };
