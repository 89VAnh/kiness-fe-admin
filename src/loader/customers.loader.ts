import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  deleteCustomer,
  getCustomerById,
  searchCustomers,
  updateCustomer,
} from "@/services/customers.service";

export const CACHE_CUSTOMERS = {
  CUSTOMERS: "CUSTOMERS",
};

const useGetCustomerById = ({
  id,
  enabled,
  config,
}: {
  id: string;
  enabled: boolean;
  config?: QueryConfig<typeof getCustomerById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getCustomerById>>({
    ...config,
    enabled,
    queryKey: [CACHE_CUSTOMERS.CUSTOMERS, id],
    queryFn: () => getCustomerById(id),
  });
};

const useUpdateCustomer = ({
  config,
}: {
  config?: MutationConfig<typeof updateCustomer>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateCustomer,
  });
};

const useDeleteCustomer = ({
  config,
}: {
  config?: MutationConfig<typeof deleteCustomer>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteCustomer,
  });
};

const useSearchCustomers = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchCustomers>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchCustomers>>({
    ...config,
    queryKey: [CACHE_CUSTOMERS.CUSTOMERS, params],
    queryFn: () => searchCustomers(params),
  });
};

export {
  useDeleteCustomer,
  useGetCustomerById,
  useSearchCustomers,
  useUpdateCustomer,
};
