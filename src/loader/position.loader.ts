import { useQuery } from "react-query";

import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { getPositionsDropdown } from "@/services/position.service";

export const CACHE_POSITION = {
  DROPDOWN_POSITION: "DROPDOWN_POSITION",
};

const usePositionDropdown = ({
  config,
}: {
  config?: QueryConfig<typeof getPositionsDropdown>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getPositionsDropdown>>({
    ...config,
    queryKey: [CACHE_POSITION.DROPDOWN_POSITION],
    queryFn: () => getPositionsDropdown(),
  });
};

export { usePositionDropdown };
