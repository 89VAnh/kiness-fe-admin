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
const GROWTH_STORY_URL = `${MANAGER_URL}/growth-story`;
const LICENSE_OF_INVENTION_URL = `${MANAGER_URL}/license-of-invention`;
const BOOK_URL = `${MANAGER_URL}/book`;

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
  // Admin
  ADMIN_URL,
  BOOK_URL,
  BRANCH_URL,
  CITY_URL,
  // Config
  CONFIG_URL,
  EMPLOYEE_URL,
  EXPERIENCE_REGISTER_URL,
  FAQ_URL,
  GROWTH_STORY_URL,
  HOME_URL,
  LICENSE_OF_INVENTION_URL,
  LOGIN_URL,
  // Manager
  MANAGER_URL,
  PAGE_URL,
  POSITION_URL,
  REQUEST_URL,
  RESEARCHER_URL,
  RESEARCH_ARTICLE_URL,
  SLIDES_URL,
  // Others
  breadcrumbNameMap,
};
