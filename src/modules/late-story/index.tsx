import { lazyLoad } from "@/utils/loadable";

export const LateStoryPage = lazyLoad(
  () => import("./LateStoryManage"),
  (module) => module.default,
);
