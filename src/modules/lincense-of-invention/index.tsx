import { lazyLoad } from "@/utils/loadable";

export const LicensePage = lazyLoad(
  () => import("./License"),
  (module) => module.default,
);
