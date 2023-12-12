const HOME_URL = "/dashboard";

// Auth
const LOGIN_URL = "/login";

// Manager
const MANAGER_URL = "/manager";
const EXPERIENCE_REGISTER_URL = `${MANAGER_URL}/experience-register`;
const REQUEST_URL = `${MANAGER_URL}/request`;
const CITY_URL = `${MANAGER_URL}/city`;
const FAQ_URL = `${MANAGER_URL}/faq`;
const RESEARCH_ARTICLE_URL = `${MANAGER_URL}/research-article`;
const RESEARCHER_URL = `${MANAGER_URL}/researcher`;

// Config
const CONFIG_URL = "/config";
const PAGE_URL = `${CONFIG_URL}/pages`;
const SLIDES_URL = `${CONFIG_URL}/slides`;

// Administration
const ADMIN_URL = `/admin`;
const BRANCH_URL = `${ADMIN_URL}/branch`;
const EMPLOYEE_URL = `${ADMIN_URL}/employees`;
const POSITION_URL = `${ADMIN_URL}/position`;

const breadcrumbNameMap: Record<string, string> = {
  [HOME_URL]: "Trang chủ",
};

export {
  MANAGER_URL,
  CITY_URL,
  EXPERIENCE_REGISTER_URL,
  FAQ_URL,
  HOME_URL,
  LOGIN_URL,
  POSITION_URL,
  REQUEST_URL,
  RESEARCHER_URL,
  RESEARCH_ARTICLE_URL,
  ADMIN_URL,
  EMPLOYEE_URL,
  BRANCH_URL,
  PAGE_URL,
  CONFIG_URL,
  SLIDES_URL,
  breadcrumbNameMap,
};
