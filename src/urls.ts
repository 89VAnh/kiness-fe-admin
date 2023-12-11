const HOME_URL = "/dashboard";

// Auth
const LOGIN_URL = "/login";

// Manager
const MANAGER_URL = "/manager";
const EXPERIENCE_REGISTER_URL = `${MANAGER_URL}/experience-register`;
const BRANCH_URL = `${MANAGER_URL}/branch`;
const REQUEST_URL = `${MANAGER_URL}/request`;
const CITY_URL = `${MANAGER_URL}/city`;
const FAQ_URL = `${MANAGER_URL}/faq`;
const RESEARCH_ARTICLE_URL = `${MANAGER_URL}/research-article`;

// Config
const CONFIG_URL = "/config";
const PAGE_URL = `${CONFIG_URL}/pages`;
const SLIDES_URL = `${CONFIG_URL}/slides`;

// Administration
const ADMIN_URL = `/admin`;
const EMPLOYEE_URL = `${ADMIN_URL}/employees`;

const POSITION_URL = `${MANAGER_URL}/position`;
const RESEARCHER_URL = `${MANAGER_URL}/researcher`;

const breadcrumbNameMap: Record<string, string> = {
  [HOME_URL]: "Trang chủ",
};

export {
  // TEST_REGISTER_URL,
  ADMIN_URL,
  BRANCH_URL,
  CITY_URL,
  CONFIG_URL,
  EMPLOYEE_URL,
  EXPERIENCE_REGISTER_URL,
  FAQ_URL,
  HOME_URL,
  LOGIN_URL,
  MANAGER_URL,
  PAGE_URL,
  POSITION_URL,
  REQUEST_URL,
  RESEARCHER_URL,
  // CUSTOMERS_URL,
  RESEARCH_ARTICLE_URL,
  SLIDES_URL,
  breadcrumbNameMap,
};
