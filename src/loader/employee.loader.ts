import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  changePasswordEmployee,
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  searchEmployees,
  updateEmployee,
} from "@/services/employees.service";

export const CACHE_EMPLOYEES = {
  SEARCH: "EMPLOYEES",
  DETAIL: "EMPLOYEE",
};

const useGetEmployeeById = ({
  id,
  enabled,
  config,
}: {
  id: string;
  enabled: boolean;
  config?: QueryConfig<typeof getEmployeeById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getEmployeeById>>({
    ...config,
    enabled,
    queryKey: [CACHE_EMPLOYEES.DETAIL, id],
    queryFn: () => getEmployeeById(id),
  });
};

const useCreateEmployee = ({
  config,
}: {
  config?: MutationConfig<typeof createEmployee>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createEmployee,
  });
};

const useUpdateEmployee = ({
  config,
}: {
  config?: MutationConfig<typeof updateEmployee>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateEmployee,
  });
};

const useChangePasswordEmployee = ({
  config,
}: {
  config?: MutationConfig<typeof changePasswordEmployee>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: changePasswordEmployee,
  });
};

const useDeleteEmployee = ({
  config,
}: {
  config?: MutationConfig<typeof deleteEmployee>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteEmployee,
  });
};

const useSearchEmployees = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchEmployees>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchEmployees>>({
    ...config,
    queryKey: [CACHE_EMPLOYEES.SEARCH, params],
    queryFn: () => searchEmployees(params),
  });
};

export {
  useDeleteEmployee,
  useGetEmployeeById,
  useChangePasswordEmployee,
  useSearchEmployees,
  useUpdateEmployee,
  useCreateEmployee,
};
