import { useQuery } from "react-query";

import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { getCitiesDropdown } from "@/services/city.service";

export const CACHE_CITY = {
  DROPDOWN_CITY: "DROPDOWN_CITY",
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

export { useCityDropdown };
