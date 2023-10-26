import { AxiosRequestConfig } from "axios";
import { useQuery } from "react-query";

import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { getCustomerById, searchCustomers } from "@/services/customers.service";

export const CACHE_CUSTOMERS = {
  CUSTOMERS: "CUSTOMERS",
};

const useGetCustomerById = ({
  id,
  config,
}: {
  id: string;
  config?: QueryConfig<typeof getCustomerById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getCustomerById>>({
    ...config,
    queryKey: [CACHE_CUSTOMERS.CUSTOMERS, id],
    queryFn: () => getCustomerById(id),
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

export { useSearchCustomers, useGetCustomerById };
