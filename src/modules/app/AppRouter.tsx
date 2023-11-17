import {
  DashboardOutlined,
  DesktopOutlined,
  FileSearchOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { ProLayoutProps } from "@ant-design/pro-components";
import { TFunction } from "i18next";
import { Link } from "react-router-dom";

import {
  BRANCH_REGISTER_URL,
  CONFIG_URL,
  CUSTOMERS_URL,
  EMPLOYEE_URL,
  EXPERIENCE_REGISTER_URL,
  HOME_URL,
  MANAGER_URL,
  NEWS_URL,
  PAGE_URL,
  SLIDES_URL,
  TEST_REGISTER_URL,
} from "@/urls";
import { getKeyFromPath } from "@/utils/format-string";

export const routes = (t: TFunction) => [
  {
    path: HOME_URL,
    name: <Link to={HOME_URL}>{t("nav.dashboard")}</Link>,
    icon: <DashboardOutlined />,
  },
  {
    path: MANAGER_URL,
    name: t("nav.manager"),
    routes: [
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
      {
        path: EXPERIENCE_REGISTER_URL,
        name: (
          <Link to={EXPERIENCE_REGISTER_URL}>
            {t("nav.experience_register")}
          </Link>
        ),
        icon: <FileSearchOutlined />,
      },
      {
        path: TEST_REGISTER_URL,
        name: <Link to={TEST_REGISTER_URL}>{t("nav.test_register")}</Link>,
        icon: <FileSearchOutlined />,
      },
      {
        path: BRANCH_REGISTER_URL,
        name: <Link to={BRANCH_REGISTER_URL}>{t("nav.branch_register")}</Link>,
        icon: <FileSearchOutlined />,
      },
    ],
  },
];

export const appRoute = (
  t: TFunction,
  userRecoil: any,
): ProLayoutProps["route"] => {
  const listRoutes = routes(t);

  if (userRecoil.position_id === 2)
    listRoutes.push(
      // Divider
      {
        path: CONFIG_URL,
        name: t("nav.config"),
        routes: [
          {
            path: PAGE_URL,
            name: <Link to={PAGE_URL}>{t("nav.page")}</Link>,
            icon: <SolutionOutlined />,
          },
          {
            path: SLIDES_URL,
            name: <Link to={SLIDES_URL}>{t("nav.slides")}</Link>,
            icon: <DesktopOutlined />,
          },
        ],
      },

      {
        path: "/admin",
        name: t("nav.admin"),
        routes: [
          {
            path: EMPLOYEE_URL,
            name: <Link to={EMPLOYEE_URL}>{t("nav.employee")}</Link>,
            icon: <SolutionOutlined />,
          },
        ],
      },
    );

  return {
    path: HOME_URL,
    routes: listRoutes,
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
