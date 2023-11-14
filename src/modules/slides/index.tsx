import { lazyLoad } from "@/utils/loadable";

export const SlideManagePage = lazyLoad(
  () => import("./SlideManage"),
  (module) => module.default,
);
