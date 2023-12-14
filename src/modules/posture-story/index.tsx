import { lazyLoad } from "@/utils/loadable";

export const PostureStoryPage = lazyLoad(
  () => import("./PostureStoryManage"),
  (module) => module.default,
);
