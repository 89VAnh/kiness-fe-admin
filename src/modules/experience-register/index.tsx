import { lazyLoad } from "@/utils/loadable";

export const ExperienceRegisterPage = lazyLoad(
  () => import("./ExperienceRegister"),
  (module) => module.default,
);
