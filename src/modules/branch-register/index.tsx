import { lazyLoad } from "@/utils/loadable";

export const BranchRegisterPage = lazyLoad(
  () => import("./BranchRegister"),
  (module) => module.default,
);
