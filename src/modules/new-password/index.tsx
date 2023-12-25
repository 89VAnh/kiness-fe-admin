import { lazyLoad } from "@/utils/loadable";

export const NewPwPage = lazyLoad(
  () => import("./NewPw"),
  (module) => module.default,
);
