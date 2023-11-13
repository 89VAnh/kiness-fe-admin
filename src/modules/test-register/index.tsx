import { lazyLoad } from "@/utils/loadable";

export const TestRegisterPage = lazyLoad(
  () => import("./TestRegister"),
  (module) => module.default,
);
