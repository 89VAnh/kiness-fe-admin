import { lazyLoad } from "@/utils/loadable";

export const EmployeePage = lazyLoad(
  () => import("./Employee"),
  (module) => module.default,
);
