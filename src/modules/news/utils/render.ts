import { TFunction } from "i18next";

import { renderRoutes } from "@/modules/app/AppRouter";
import { NEWS_URL } from "@/urls";

export const renderAboutMenus = (t: TFunction) => {
  const items = [
    ...renderRoutes(t, [NEWS_URL], "news")?.map((route) => ({
      key: route.key || "",
      label: route.title,
      url: route.path,
    })),
  ];

  return items;
};
