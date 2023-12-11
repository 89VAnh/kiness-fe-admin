import {
  ApartmentOutlined,
  DashboardOutlined,
  DesktopOutlined,
  ProfileOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { ProLayoutProps } from "@ant-design/pro-components";
import { t } from "i18next";
import { Link } from "react-router-dom";

import {
  ADMIN_URL,
  BRANCH_URL,
  CITY_URL,
  CONFIG_URL,
  EMPLOYEE_URL,
  EXPERIENCE_REGISTER_URL,
  FAQ_URL,
  HOME_URL,
  MANAGER_URL,
  PAGE_URL,
  POSITION_URL,
  REQUEST_URL,
  RESEARCHER_URL,
  SLIDES_URL,
} from "@/urls";

const functions = [
  {
    title: t("nav.dashboard"),
    url: HOME_URL,
    icon: <DashboardOutlined />,
    children: [],
    sort_order: 0,
    is_leaf: true,
  },
  {
    title: t("nav.manager"),
    url: MANAGER_URL,
    icon: <ProfileOutlined />,
    children: [
      {
        title: t("nav.experience_register"),
        url: EXPERIENCE_REGISTER_URL,
        children: [],
        sort_order: 0,
        is_leaf: true,
      },
      {
        title: t("nav.city"),
        url: CITY_URL,
        children: [],
        sort_order: 2,
        is_leaf: true,
      },
      {
        title: t("nav.faq"),
        url: FAQ_URL,
        children: [],
        sort_order: 3,
        is_leaf: true,
      },
      {
        title: t("nav.request"),
        url: REQUEST_URL,
        children: [],
        sort_order: 4,
        is_leaf: true,
      },
      {
        url: RESEARCHER_URL,
        title: t("nav.researcher"),
        children: [],
        sort_order: 5,
        icon: <TeamOutlined />,
        is_leaf: true,
      },
    ],
    sort_order: 1,
    is_leaf: false,
  },
  {
    title: t("nav.admin"),
    url: ADMIN_URL,
    icon: <SettingOutlined />,
    children: [
      {
        title: t("nav.employee"),
        url: EMPLOYEE_URL,
        children: [],
        sort_order: 0,
        is_leaf: true,
      },
      {
        title: t("nav.branch"),
        url: BRANCH_URL,
        children: [],
        sort_order: 1,
        is_leaf: true,
      },
      {
        url: POSITION_URL,
        title: t("nav.position"),
        children: [],
        sort_order: 4,
        icon: <ApartmentOutlined />,
        is_leaf: true,
      },
    ],
    sort_order: 1,
    is_leaf: false,
  },
  {
    title: t("nav.config"),
    url: CONFIG_URL,
    icon: <DesktopOutlined />,
    children: [
      {
        title: t("nav.page"),
        url: PAGE_URL,
        children: [],
        sort_order: 0,
        is_leaf: true,
      },
      {
        title: t("nav.slides"),
        url: SLIDES_URL,
        children: [],
        sort_order: 1,
        is_leaf: true,
      },
    ],
    sort_order: 2,
    is_leaf: false,
  },
];

const generateRoutes = (tree: any[] = []) => {
  const routes: any[] = [];
  if (tree.length === 0) return routes;
  for (let i = 0; i < tree.length; i++) {
    const route = {
      key: tree[i].title,
      icon: tree[i]?.icon,
      path: tree[i].url,
      title: tree[i].title,
      name: (
        <Link preventScrollReset to={tree[i].url}>
          {tree[i].title}
        </Link>
      ),
      routes: generateRoutes(tree[i].children),
      sort: tree[i].sort_order,
    };

    routes.push(route);
  }

  return routes;
};

export const appRoute = (): ProLayoutProps["route"] => {
  const routes = [...generateRoutes(functions)].sort((a, b) => a.sort - b.sort);
  return {
    path: HOME_URL,
    routes,
  };
};
