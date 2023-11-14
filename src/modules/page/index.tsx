import { lazyLoad } from "@/utils/loadable";

export const PageManagePage = lazyLoad(
  () => import("./PageManage"),
  (module) => module.default,
);
