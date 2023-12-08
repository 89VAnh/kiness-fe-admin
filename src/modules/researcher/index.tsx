import { lazyLoad } from "@/utils/loadable";

export const ResearcherPage = lazyLoad(
  () => import("./Researcher"),
  (module) => module.default,
);
