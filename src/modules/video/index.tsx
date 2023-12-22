import { lazyLoad } from "@/utils/loadable";

export const VideoPage = lazyLoad(
  () => import("./Video"),
  (module) => module.default,
);
