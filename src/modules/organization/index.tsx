import { lazyLoad } from "@/utils/loadable";

export const OrganizationPage = lazyLoad(
  () => import("./Organization"),
  (module) => module.default,
);
