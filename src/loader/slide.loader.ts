import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createSlide,
  deleteSlide,
  getSlideById,
  searchSlides,
  updateSlide,
} from "@/services/slide.service";

export const CACHE_SLIDES = {
  SEARCH: "SLIDES",
  DETAIL: "SLIDE_DETAIL",
};

// Get detail
const useGetSlideById = ({
  id,
  enabled = true,
  config,
}: {
  id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getSlideById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getSlideById>>({
    ...config,
    enabled,
    queryKey: [CACHE_SLIDES.DETAIL, id],
    queryFn: () => getSlideById(id),
  });
};

// Search list
const useSearchSlides = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchSlides>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchSlides>>({
    ...config,
    queryKey: [CACHE_SLIDES.SEARCH, params],
    queryFn: () => searchSlides(params),
  });
};

// Update
const useUpdateSlide = ({
  config,
}: {
  config?: MutationConfig<typeof updateSlide>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateSlide,
  });
};

// Create
const useCreateSlide = ({
  config,
}: {
  config?: MutationConfig<typeof createSlide>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createSlide,
  });
};

// Delete
const useDeleteSlide = ({
  config,
}: {
  config?: MutationConfig<typeof deleteSlide>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteSlide,
  });
};

export {
  useCreateSlide,
  useDeleteSlide,
  useGetSlideById,
  useSearchSlides,
  useUpdateSlide,
};
