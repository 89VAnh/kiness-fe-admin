import { lazyLoad } from "@/utils/loadable";

export const PositionPage = lazyLoad(
  () => import("./Position"),
  (module) => module.default,
);
