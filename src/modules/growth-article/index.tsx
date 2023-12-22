import { lazyLoad } from "@/utils/loadable";

export const GrowthArticlePage = lazyLoad(
  () => import("./GrowthArticleManage"),
  (module) => module.default,
);
