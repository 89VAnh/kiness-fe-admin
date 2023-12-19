import { lazyLoad } from "@/utils/loadable";

export const HistoryPage = lazyLoad(
  () => import("./HistoryManage"),
  (module) => module.default,
);
