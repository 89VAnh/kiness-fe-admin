import { TFunction } from "i18next";

import { renderRoutes } from "@/modules/app/AppRouter";
import { POSITION_URL } from "@/urls";

export const renderAboutMenus = (t: TFunction) => {
  const items = [
    ...renderRoutes(t, [POSITION_URL], "position")?.map((route) => ({
      key: route.key || "",
      label: route.title,
      url: route.path,
    })),
  ];

  return items;
};
