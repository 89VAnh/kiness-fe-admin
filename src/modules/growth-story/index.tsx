import { lazyLoad } from "@/utils/loadable";

export const GrowthStoryPage = lazyLoad(
  () => import("./GrowthStoryManage"),
  (module) => module.default,
);
