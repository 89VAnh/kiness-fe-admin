import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createPage,
  deletePage,
  getPageById,
  searchPages,
  updatePage,
} from "@/services/pages.service";

export const CACHE_PAGES = {
  PAGES: "PAGES",
  PAGE_DETAIL: "PAGE_DETAIL",
};

// Get detail
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
    queryKey: [CACHE_PAGES.PAGE_DETAIL, id],
    queryFn: () => getPageById(id),
  });
};

// Search list
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

// Update
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

// Create
const useCreatePage = ({
  config,
}: {
  config?: MutationConfig<typeof createPage>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createPage,
  });
};

// Delete
const useDeletePage = ({
  config,
}: {
  config?: MutationConfig<typeof deletePage>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deletePage,
  });
};

export {
  useSearchPages,
  useGetPageById,
  useUpdatePage,
  useCreatePage,
  useDeletePage,
};
