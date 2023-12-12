import { lazyLoad } from "@/utils/loadable";

export const ResearchArticlePage = lazyLoad(
  () => import("./ResearchArticleManage"),
  (module) => module.default,
);
