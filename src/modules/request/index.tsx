import { lazyLoad } from "@/utils/loadable";

export const RequestPage = lazyLoad(
  () => import("./RequestManage"),
  (module) => module.default,
);
