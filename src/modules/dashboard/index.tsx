import { lazyLoad } from "@/utils/loadable";

export const DashboardPage = lazyLoad(
  () => import("./Dashboard"),
  (module) => module.default,
);
