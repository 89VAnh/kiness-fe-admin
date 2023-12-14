import { lazyLoad } from "@/utils/loadable";

export const BookPage = lazyLoad(
  () => import("./BookManage"),
  (module) => module.default,
);
