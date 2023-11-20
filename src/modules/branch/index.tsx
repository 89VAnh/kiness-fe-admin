import { lazyLoad } from "@/utils/loadable";

export const BranchManagePage = lazyLoad(
  () => import("./BranchManage"),
  (module) => module.default,
);
