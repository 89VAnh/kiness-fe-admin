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

import { LOCAL_USER } from "@/constant/config";
import { IEmployee } from "@/models/employee";
import {
  ADMIN_URL,
  BOOK_URL,
  BRANCH_URL,
  CITY_URL,
  CONFIG_URL,
  EMPLOYEE_URL,
  EXPERIENCE_REGISTER_URL,
  FAQ_URL,
  GROWTH_STORY_URL,
  HISTORY_URL,
  HOME_URL,
  LATE_STORY_URL,
  LICENSE_OF_INVENTION_URL,
  MANAGER_URL,
  OBESITY_STORY_URL,
  PAGE_URL,
  POSITION_URL,
  POSTURE_STORY_URL,
  REQUEST_URL,
  RESEARCHER_URL,
  RESEARCH_ARTICLE_URL,
  SLIDES_URL,
} from "@/urls";
import { storageService } from "@/utils/storage";

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
      {
        url: RESEARCH_ARTICLE_URL,
        title: t("nav.research_article"),
        children: [],
        sort_order: 6,
        icon: <TeamOutlined />,
        is_leaf: true,
      },
      {
        url: GROWTH_STORY_URL,
        title: t("nav.growth_story"),
        children: [],
        sort_order: 7,
        icon: <TeamOutlined />,
        is_leaf: true,
      },
      {
        url: POSTURE_STORY_URL,
        title: t("nav.posture_story"),
        children: [],
        sort_order: 8,
        icon: <TeamOutlined />,
        is_leaf: true,
      },
      {
        url: LATE_STORY_URL,
        title: t("nav.late_story"),
        children: [],
        sort_order: 9,
        icon: <TeamOutlined />,
        is_leaf: true,
      },
      {
        url: OBESITY_STORY_URL,
        title: t("nav.obesity_story"),
        children: [],
        sort_order: 10,
        icon: <TeamOutlined />,
        is_leaf: true,
      },
      {
        url: LICENSE_OF_INVENTION_URL,
        title: t("nav.license_of_invention"),
        children: [],
        sort_order: 11,
        icon: <TeamOutlined />,
        is_leaf: true,
      },
      {
        url: BOOK_URL,
        title: t("nav.book"),
        children: [],
        sort_order: 8,
        icon: <TeamOutlined />,
        is_leaf: true,
      },
      {
        url: HISTORY_URL,
        title: t("nav.history"),
        children: [],
        sort_order: 12,
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
    role: 2, // Test
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
    role: 2, // Test
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

  // Drunk
  const user: IEmployee = storageService.getStorage(LOCAL_USER);

  for (let i = 0; i < tree.length; i++) {
    if (tree[i].role && user.position_id !== tree[i].role) continue;
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
