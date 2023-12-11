const HOME_URL = "/dashboard";

// Auth
const LOGIN_URL = "/login";

// Manager
const MANAGER_URL = "/manager";
const EXPERIENCE_REGISTER_URL = `${MANAGER_URL}/experience-register`;
const REQUEST_URL = `${MANAGER_URL}/request`;
const CITY_URL = `${MANAGER_URL}/city`;
const FAQ_URL = `${MANAGER_URL}/faq`;
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
  BRANCH_URL,
  CITY_URL,
  FAQ_URL,
  CONFIG_URL,
  // CUSTOMERS_URL,
  EXPERIENCE_REGISTER_URL,
  HOME_URL,
  LOGIN_URL,
  MANAGER_URL,
  PAGE_URL,
  POSITION_URL,
  REQUEST_URL,
  RESEARCHER_URL,
  SLIDES_URL,
  // TEST_REGISTER_URL,
  ADMIN_URL,
  EMPLOYEE_URL,
  breadcrumbNameMap,
};
