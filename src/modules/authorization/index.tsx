import { lazyLoad } from "@/utils/loadable";

export const FunctionPage = lazyLoad(
  () => import("./components/functions-management/ListFunction"),
  (module) => module.default,
);

export const RolePage = lazyLoad(
  () => import("./components/roles-management/ListRole"),
  (module) => module.ListRole,
);

// export const UserPage = lazyLoad(
//   () => import("./views/ListUser"),
//   (module) => module.ListUser,
// );
