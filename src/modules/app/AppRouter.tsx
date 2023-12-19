import {
  ApartmentOutlined,
  DashboardOutlined,
  DesktopOutlined,
  ProfileOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { ProLayoutProps } from "@ant-design/pro-components";
import { Link } from "react-router-dom";

import { LOCAL_USER } from "@/constant/config";
import { IEmployee } from "@/models/employee";
import { HOME_URL } from "@/urls";
import { storageService } from "@/utils/storage";

const icons = [
  <DashboardOutlined />,
  <ProfileOutlined />,
  <SettingOutlined />,
  <DesktopOutlined />,
  <ApartmentOutlined />,
  <TeamOutlined />,
];

// const functions = [
//   {
//     title: t("nav.dashboard"),
//     url: HOME_URL,
//     icon: <DashboardOutlined />,
//     children: [],
//     sort_order: 0,
//     is_leaf: true,
//   },
//   {
//     title: t("nav.manager"),
//     url: MANAGER_URL,
//     icon: <ProfileOutlined />,
//     children: [
//       {
//         title: t("nav.experience_register"),
//         url: EXPERIENCE_REGISTER_URL,
//         children: [],
//         sort_order: 0,
//         is_leaf: true,
//       },
//       {
//         title: t("nav.city"),
//         url: CITY_URL,
//         children: [],
//         sort_order: 2,
//         is_leaf: true,
//       },
//       {
//         title: t("nav.faq"),
//         url: FAQ_URL,
//         children: [],
//         sort_order: 3,
//         is_leaf: true,
//       },
//       {
//         title: t("nav.request"),
//         url: REQUEST_URL,
//         children: [],
//         sort_order: 4,
//         is_leaf: true,
//       },
//       {
//         url: RESEARCHER_URL,
//         title: t("nav.researcher"),
//         children: [],
//         sort_order: 5,
//         icon: <TeamOutlined />,
//         is_leaf: true,
//       },
//       {
//         url: RESEARCH_ARTICLE_URL,
//         title: t("nav.research_article"),
//         children: [],
//         sort_order: 6,
//         icon: <TeamOutlined />,
//         is_leaf: true,
//       },
//       {
//         url: GROWTH_STORY_URL,
//         title: t("nav.growth_story"),
//         children: [],
//         sort_order: 7,
//         icon: <TeamOutlined />,
//         is_leaf: true,
//       },
//       {
//         url: POSTURE_STORY_URL,
//         title: t("nav.posture_story"),
//         children: [],
//         sort_order: 8,
//         icon: <TeamOutlined />,
//         is_leaf: true,
//       },
//       {
//         url: LATE_STORY_URL,
//         title: t("nav.late_story"),
//         children: [],
//         sort_order: 9,
//         icon: <TeamOutlined />,
//         is_leaf: true,
//       },
//       {
//         url: OBESITY_STORY_URL,
//         title: t("nav.obesity_story"),
//         children: [],
//         sort_order: 10,
//         icon: <TeamOutlined />,
//         is_leaf: true,
//       },
//       {
//         url: LICENSE_OF_INVENTION_URL,
//         title: t("nav.license_of_invention"),
//         children: [],
//         sort_order: 11,
//         icon: <TeamOutlined />,
//         is_leaf: true,
//       },
//       {
//         url: BOOK_URL,
//         title: t("nav.book"),
//         children: [],
//         sort_order: 8,
//         icon: <TeamOutlined />,
//         is_leaf: true,
//       },
//     ],
//     sort_order: 1,
//     is_leaf: false,
//   },
//   {
//     title: t("nav.admin"),
//     url: ADMIN_URL,
//     icon: <SettingOutlined />,
//     role: 2, // Test
//     children: [
//       {
//         title: t("nav.employee"),
//         url: EMPLOYEE_URL,
//         children: [],
//         sort_order: 0,
//         is_leaf: true,
//       },
//       {
//         title: t("nav.branch"),
//         url: BRANCH_URL,
//         children: [],
//         sort_order: 1,
//         is_leaf: true,
//       },
//       {
//         url: POSITION_URL,
//         title: t("nav.position"),
//         children: [],
//         sort_order: 4,
//         icon: <ApartmentOutlined />,
//         is_leaf: true,
//       },
//       {
//         url: FUNCTION_URL,
//         title: t("nav.function"),
//         children: [],
//         sort_order: 5,
//         icon: <ApartmentOutlined />,
//         is_leaf: true,
//       },
//       {
//         url: ROLE_URL,
//         title: t("nav.role"),
//         children: [],
//         sort_order: 6,
//         icon: <ApartmentOutlined />,
//         is_leaf: true,
//       },
//     ],
//     sort_order: 1,
//     is_leaf: false,
//   },
//   {
//     title: t("nav.config"),
//     url: CONFIG_URL,
//     icon: <DesktopOutlined />,
//     role: 2, // Test
//     children: [
//       {
//         title: t("nav.page"),
//         url: PAGE_URL,
//         children: [],
//         sort_order: 0,
//         is_leaf: true,
//       },
//       {
//         title: t("nav.slides"),
//         url: SLIDES_URL,
//         children: [],
//         sort_order: 1,
//         is_leaf: true,
//       },
//     ],
//     sort_order: 2,
//     is_leaf: false,
//   },
// ];

const generateRoutes = (tree: any[] = []) => {
  const routes: any[] = [];
  if (tree.length === 0) return routes;

  // Drunk
  const user: IEmployee = storageService.getStorage(LOCAL_USER);

  for (let i = 0; i < tree.length; i++) {
    if (tree[i].role && user.position_id !== tree[i].role) continue;
    const route = {
      key: tree[i].title,
      // eslint-disable-next-line eqeqeq
      icon: tree[i].level == 1 ? icons[i] : null,
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

export const appRoute = (functions: any[]): ProLayoutProps["route"] => {
  const routes = [...generateRoutes(functions)].sort((a, b) => a.sort - b.sort);
  return {
    path: HOME_URL,
    routes,
  };
};
