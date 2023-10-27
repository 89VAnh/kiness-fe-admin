import { AxiosRequestConfig } from "axios";
import { useQuery } from "react-query";

import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import {
  deleteCustomer,
  getCustomerById,
  searchCustomers,
} from "@/services/customers.service";

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

// const useDeleteCustomer = ({
//   list_json,
//   updated_by_id,
//   config,
// }: {
//   list_json: [{ customer_id: string }];
//   updated_by_id: string;
//   config?: QueryConfig<typeof deleteCustomer>;
// }) => {
//   return useQuery<ExtractFnReturnType<typeof deleteCustomer>>({
//     ...config,
//     queryKey: [CACHE_CUSTOMERS.CUSTOMERS, list_json, updated_by_id],
//     queryFn: () => deleteCustomer(list_json, updated_by_id),
//   });
// };

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

export { useGetCustomerById, useSearchCustomers };
