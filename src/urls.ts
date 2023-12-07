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

// Config
const CONFIG_URL = "/config";
const PAGE_URL = `${CONFIG_URL}/pages`;
const SLIDES_URL = `${CONFIG_URL}/slides`;

// Administration
const ADMIN_URL = `/admin`;
const EMPLOYEE_URL = `${ADMIN_URL}/employees`;

const breadcrumbNameMap: Record<string, string> = {
  [HOME_URL]: "Trang chủ",
};

export {
  REQUEST_URL,
  BRANCH_URL,
  CITY_URL,
  FAQ_URL,
  CONFIG_URL,
  EXPERIENCE_REGISTER_URL,
  HOME_URL,
  LOGIN_URL,
  MANAGER_URL,
  PAGE_URL,
  SLIDES_URL,
  ADMIN_URL,
  EMPLOYEE_URL,
  breadcrumbNameMap,
};
