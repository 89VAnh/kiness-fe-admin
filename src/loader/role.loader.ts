import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createRole,
  deleteRole,
  getRoleById,
  getRolesDropdown,
  searchRoles,
  updateRole,
} from "@/services/role.service";

export const CACHE_ROLE = {
  DROPDOWN: "DROPDOWN_ROLE",
  DETAIL: "ROLE",
  SEARCH: "ROLES",
};

const useRoleDropdown = ({
  config,
}: {
  config?: QueryConfig<typeof getRolesDropdown>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getRolesDropdown>>({
    ...config,
    queryKey: [CACHE_ROLE.DROPDOWN],
    queryFn: () => getRolesDropdown(),
  });
};

const useSearchRoles = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchRoles>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchRoles>>({
    ...config,
    queryKey: [CACHE_ROLE.SEARCH, params],
    queryFn: () => searchRoles({ params }),
  });
};

const useGetRoleById = ({
  id,
  enabled,
  config,
}: {
  id: number;
  enabled: boolean;
  config?: QueryConfig<typeof getRoleById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getRoleById>>({
    ...config,
    enabled,
    queryKey: [CACHE_ROLE.DETAIL, id],
    queryFn: () => getRoleById(id),
  });
};

const useUpdateRole = ({
  config,
}: {
  config?: MutationConfig<typeof updateRole>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateRole,
  });
};

const useDeleteRole = ({
  config,
}: {
  config?: MutationConfig<typeof deleteRole>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteRole,
  });
};

const useCreateRole = ({
  config,
}: {
  config?: MutationConfig<typeof createRole>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createRole,
  });
};

export {
  useRoleDropdown,
  useCreateRole,
  useDeleteRole,
  useGetRoleById,
  useSearchRoles,
  useUpdateRole,
};
