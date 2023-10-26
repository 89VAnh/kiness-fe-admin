import { lazyLoad } from "@/utils/loadable";

export const CustomerPage = lazyLoad(
  () => import("./Customer"),
  (module) => module.default,
);
