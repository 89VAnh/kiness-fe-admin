import {
  DashboardOutlined,
  FileSearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { ProLayoutProps } from "@ant-design/pro-components";
import { TFunction } from "i18next";
import { Link } from "react-router-dom";

import { CUSTOMERS_URL, HOME_URL, NEWS_URL } from "@/urls";
import { getKeyFromPath } from "@/utils/format-string";

export const routes = (t: TFunction) => [
  {
    path: HOME_URL,
    name: <Link to={HOME_URL}>{t("nav.dashboard")}</Link>,
    icon: <DashboardOutlined />,
  },
  {
    path: NEWS_URL,
    name: <Link to={NEWS_URL}>{t("nav.news")}</Link>,
    icon: <FileSearchOutlined />,
  },
  {
    path: CUSTOMERS_URL,
    name: <Link to={CUSTOMERS_URL}>{t("nav.customer")}</Link>,
    icon: <TeamOutlined />,
  },
];

export const appRoute = (t: TFunction): ProLayoutProps["route"] => {
  return {
    path: HOME_URL,
    routes: routes(t),
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
