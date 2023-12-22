import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createDiagram,
  deleteDiagram,
  getDiagramById,
  searchDiagrams,
  updateDiagram,
} from "@/services/diagram.service";

export const CACHE_DIAGRAM = {
  SEARCH: "DIAGRAMS",
  DETAIL: "DIAGRAM_DETAIL",
};

// Get detail
const useGetDiagramById = ({
  id,
  enabled = true,
  config,
}: {
  id: string;
  enabled?: boolean;
  config?: QueryConfig<typeof getDiagramById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getDiagramById>>({
    ...config,
    enabled,
    queryKey: [CACHE_DIAGRAM.DETAIL, id],
    queryFn: () => getDiagramById(id),
  });
};

// Search list
const useSearchDiagrams = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchDiagrams>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchDiagrams>>({
    ...config,
    queryKey: [CACHE_DIAGRAM.SEARCH, params],
    queryFn: () => searchDiagrams(params),
  });
};

// Update
const useUpdateDiagram = ({
  config,
}: {
  config?: MutationConfig<typeof updateDiagram>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateDiagram,
  });
};

// Create
const useCreateDiagram = ({
  config,
}: {
  config?: MutationConfig<typeof createDiagram>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createDiagram,
  });
};

// Delete
const useDeleteDiagram = ({
  config,
}: {
  config?: MutationConfig<typeof deleteDiagram>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteDiagram,
  });
};

export {
  useCreateDiagram,
  useDeleteDiagram,
  useGetDiagramById,
  useSearchDiagrams,
  useUpdateDiagram,
};
