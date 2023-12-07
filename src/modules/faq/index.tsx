import { lazyLoad } from "@/utils/loadable";

export const FaqManagePage = lazyLoad(
  () => import("./FaqManage"),
  (module) => module.default,
);
