import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createLicenseOfInvention,
  deleteLicenseOfInvention,
  getLicenseOfInventionById,
  searchLicenses,
  updateLicenseOfInvention,
} from "@/services/license-of-invention.service";

export const CACHE_LICENSE_OF_INVENTION = {
  SEARCH: "LICENSE_OF_INVENTIONS",
  DETAIL: "LICENSE_OF_INVENTION_DETAIL",
};

// Get detail
const useGetLicenseOfInventionById = ({
  id,
  enabled = true,
  config,
}: {
  id: number;
  enabled?: boolean;
  config?: QueryConfig<typeof getLicenseOfInventionById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getLicenseOfInventionById>>({
    ...config,
    enabled,
    queryKey: [CACHE_LICENSE_OF_INVENTION.DETAIL, id],
    queryFn: () => getLicenseOfInventionById(id),
  });
};

// Search list
const useSearchLicenses = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchLicenses>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchLicenses>>({
    ...config,
    queryKey: [CACHE_LICENSE_OF_INVENTION.SEARCH, params],
    queryFn: () => searchLicenses(params),
  });
};

// Update
const useUpdateLicenseOfInvention = ({
  config,
}: {
  config?: MutationConfig<typeof updateLicenseOfInvention>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateLicenseOfInvention,
  });
};

// Create
const useCreateLicenseOfInvention = ({
  config,
}: {
  config?: MutationConfig<typeof createLicenseOfInvention>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createLicenseOfInvention,
  });
};

// Delete
const useDeleteLicenseOfInvention = ({
  config,
}: {
  config?: MutationConfig<typeof deleteLicenseOfInvention>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteLicenseOfInvention,
  });
};

export {
  useCreateLicenseOfInvention,
  useDeleteLicenseOfInvention,
  useGetLicenseOfInventionById,
  useSearchLicenses,
  useUpdateLicenseOfInvention,
};
