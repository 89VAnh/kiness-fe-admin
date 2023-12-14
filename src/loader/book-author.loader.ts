import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createBookAuthor,
  deleteBookAuthor,
  getBookAuthorById,
  getBookAuthorDropdown,
  searchBookAuthors,
  updateBookAuthor,
} from "@/services/book-author.service";

export const CACHE_BOOK_AUTHOR = {
  SEARCH: "BOOK_AUTHORS",
  DETAIL: "BOOK_AUTHOR_DETAIL",
  DROPDOWN: "BOOK_AUTHORS_DROPDOWN",
};

const useBookAuthorDropdown = ({
  config,
}: {
  config?: QueryConfig<typeof getBookAuthorDropdown>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getBookAuthorDropdown>>({
    ...config,
    queryKey: [CACHE_BOOK_AUTHOR.DROPDOWN],
    queryFn: () => getBookAuthorDropdown(),
  });
};

// Get detail
const useGetBookAuthorById = ({
  id,
  enabled = true,
  config,
}: {
  id: number;
  enabled?: boolean;
  config?: QueryConfig<typeof getBookAuthorById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getBookAuthorById>>({
    ...config,
    enabled,
    queryKey: [CACHE_BOOK_AUTHOR.DETAIL, id],
    queryFn: () => getBookAuthorById(id),
  });
};

// Search list
const useSearchBookAuthors = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchBookAuthors>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchBookAuthors>>({
    ...config,
    queryKey: [CACHE_BOOK_AUTHOR.SEARCH, params],
    queryFn: () => searchBookAuthors(params),
  });
};

// Update
const useUpdateBookAuthor = ({
  config,
}: {
  config?: MutationConfig<typeof updateBookAuthor>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateBookAuthor,
  });
};

// Create
const useCreateBookAuthor = ({
  config,
}: {
  config?: MutationConfig<typeof createBookAuthor>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createBookAuthor,
  });
};

// Delete
const useDeleteBookAuthor = ({
  config,
}: {
  config?: MutationConfig<typeof deleteBookAuthor>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteBookAuthor,
  });
};

export {
  useBookAuthorDropdown,
  useCreateBookAuthor,
  useDeleteBookAuthor,
  useGetBookAuthorById,
  useSearchBookAuthors,
  useUpdateBookAuthor,
};
