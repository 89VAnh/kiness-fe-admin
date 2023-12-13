import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createBook,
  deleteBook,
  getBookById,
  searchBooks,
  updateBook,
} from "@/services/book.service";

export const CACHE_BOOK = {
  SEARCH: "BOOKS",
  DETAIL: "BOOK_DETAIL",
  DROPDOWN: "BOOKS_DROPDOWN",
};

// Get detail
const useGetBookById = ({
  id,
  enabled = true,
  config,
}: {
  id: number;
  enabled?: boolean;
  config?: QueryConfig<typeof getBookById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getBookById>>({
    ...config,
    enabled,
    queryKey: [CACHE_BOOK.DETAIL, id],
    queryFn: () => getBookById(id),
  });
};

// Search list
const useSearchBooks = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchBooks>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchBooks>>({
    ...config,
    queryKey: [CACHE_BOOK.SEARCH, params],
    queryFn: () => searchBooks(params),
  });
};

// Update
const useUpdateBook = ({
  config,
}: {
  config?: MutationConfig<typeof updateBook>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateBook,
  });
};

// Create
const useCreateBook = ({
  config,
}: {
  config?: MutationConfig<typeof createBook>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createBook,
  });
};

// Delete
const useDeleteBook = ({
  config,
}: {
  config?: MutationConfig<typeof deleteBook>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteBook,
  });
};

export {
  useCreateBook,
  useDeleteBook,
  useGetBookById,
  useSearchBooks,
  useUpdateBook,
};
