import { lazyLoad } from "@/utils/loadable";

export const CityManagePage = lazyLoad(
  () => import("./CityManage"),
  (module) => module.default,
);
