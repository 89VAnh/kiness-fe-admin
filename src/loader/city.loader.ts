import { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from "@/lib/react-query";
import {
  createCity,
  deleteCity,
  getCitiesDropdown,
  getCityById,
  searchCities,
  updateCity,
} from "@/services/city.service";

export const CACHE_CITY = {
  DROPDOWN_CITY: "DROPDOWN_CITY",
  CITIES: "CITIES",
};

const useCityDropdown = ({
  config,
}: {
  config?: QueryConfig<typeof getCitiesDropdown>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getCitiesDropdown>>({
    ...config,
    queryKey: [CACHE_CITY.DROPDOWN_CITY],
    queryFn: () => getCitiesDropdown(),
  });
};

const useSearchCities = ({
  params,
  config,
}: {
  params: AxiosRequestConfig["params"];
  config?: QueryConfig<typeof searchCities>;
}) => {
  return useQuery<ExtractFnReturnType<typeof searchCities>>({
    ...config,
    queryKey: [CACHE_CITY.CITIES, params],
    queryFn: () => searchCities({ params }),
  });
};

const useGetCityById = ({
  id,
  enabled,
  config,
}: {
  id: number;
  enabled: boolean;
  config?: QueryConfig<typeof getCityById>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getCityById>>({
    ...config,
    enabled,
    queryKey: [CACHE_CITY.CITIES, id],
    queryFn: () => getCityById(id),
  });
};

const useUpdateCity = ({
  config,
}: {
  config?: MutationConfig<typeof updateCity>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: updateCity,
  });
};

const useDeleteCity = ({
  config,
}: {
  config?: MutationConfig<typeof deleteCity>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: deleteCity,
  });
};

const useCreateCity = ({
  config,
}: {
  config?: MutationConfig<typeof createCity>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: createCity,
  });
};

export {
  useCityDropdown,
  useCreateCity,
  useDeleteCity,
  useGetCityById,
  useSearchCities,
  useUpdateCity,
};
