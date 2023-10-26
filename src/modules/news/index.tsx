import { lazyLoad } from "@/utils/loadable";

export const NewsPage = lazyLoad(
  () => import("./News"),
  (module) => module.default,
);
