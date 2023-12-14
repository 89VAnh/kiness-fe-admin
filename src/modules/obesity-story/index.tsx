import { lazyLoad } from "@/utils/loadable";

export const ObesityStoryPage = lazyLoad(
  () => import("./ObesityStoryManage"),
  (module) => module.default,
);
