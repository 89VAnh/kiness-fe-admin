import { SmileFilled } from "@ant-design/icons";
import { ProLayoutProps } from "@ant-design/pro-components";
import { TFunction } from "i18next";
import { Link } from "react-router-dom";

import { HOME_URL } from "@/urls";
import { getKeyFromPath } from "@/utils/format-string";

export const appRoute = (t: TFunction): ProLayoutProps["route"] => {
  console.log(t);
  return {
    path: HOME_URL,
    routes: [
      {
        path: "/",
        name: "Home",
        icon: <SmileFilled />,
      },
    ],
  };
};

export const renderRoutes = (
  t: TFunction,
  listUrls: string[],
  prefixLocale: string,
  disabled: boolean = false,
) => {
  return listUrls.map((url) => ({
    key: getKeyFromPath(url),
    path: url,
    title: t(`nav.${prefixLocale}.children.${getKeyFromPath(url)}`),
    name: (
      <Link to={url} onClick={(e) => disabled && e.preventDefault()}>
        {t(`nav.${prefixLocale}.children.${getKeyFromPath(url)}`)}
      </Link>
    ),
  }));
};
