const HOME_URL = "/dashboard";

// Auth
const LOGIN_URL = "/login";
const NEW_PASSWORD_URL = "/new-password";

// Customer
const CUSTOMER_URL = "/customer";
const EXPERIENCE_REGISTER_URL = `${CUSTOMER_URL}/experience-register`;
const REQUEST_URL = `${CUSTOMER_URL}/request`;
const FAQ_URL = `${CUSTOMER_URL}/faq`;
const GROWTH_STORY_URL = `${CUSTOMER_URL}/growth-story`;
const POSTURE_STORY_URL = `${CUSTOMER_URL}/posture-story`;
const LATE_STORY_URL = `${CUSTOMER_URL}/late-story`;
const OBESITY_STORY_URL = `${CUSTOMER_URL}/obesity-story`;
const GROWTH_ARTICLE_URL = `${CUSTOMER_URL}/growth-article`;

// Config
const CONFIG_URL = "/config";
const PAGE_URL = `${CONFIG_URL}/pages`;

// Manager
const MANAGER_URL = "/manager";
const RESEARCH_ARTICLE_URL = `${MANAGER_URL}/research-article`;
const RESEARCHER_URL = `${MANAGER_URL}/researcher`;
const LICENSE_OF_INVENTION_URL = `${MANAGER_URL}/license-of-invention`;
const BOOK_URL = `${MANAGER_URL}/book`;
const HISTORY_URL = `${MANAGER_URL}/history`;
const ORGANIZATION_URL = `${MANAGER_URL}/organization`;
const EMPLOYEE_URL = `${MANAGER_URL}/employees`;
const VIDEO_URL = `${MANAGER_URL}/video`;
const BRANCH_URL = `${MANAGER_URL}/branch`;

// Administration
const ADMIN_URL = `/admin`;
const POSITION_URL = `${ADMIN_URL}/position`;
const FUNCTION_URL = `${ADMIN_URL}/functions`;
const ROLE_URL = `${ADMIN_URL}/roles`;
const USER_URL = `${ADMIN_URL}/users`;
const SLIDES_URL = `${ADMIN_URL}/slides`;

const breadcrumbNameMap: Record<string, string> = {
  [HOME_URL]: "Trang chủ",
};

export {
  //Customer
  CUSTOMER_URL,
  // Admin
  ADMIN_URL,
  BOOK_URL,
  BRANCH_URL,
  // Config
  CONFIG_URL,
  EMPLOYEE_URL,
  EXPERIENCE_REGISTER_URL,
  FAQ_URL,
  FUNCTION_URL,
  GROWTH_STORY_URL,
  HISTORY_URL,
  HOME_URL,
  LATE_STORY_URL,
  LICENSE_OF_INVENTION_URL,
  LOGIN_URL,
  // Manager
  MANAGER_URL,
  NEW_PASSWORD_URL,
  // Config
  OBESITY_STORY_URL,
  PAGE_URL,
  POSITION_URL,
  POSTURE_STORY_URL,
  REQUEST_URL,
  RESEARCHER_URL,
  RESEARCH_ARTICLE_URL,
  ROLE_URL,
  SLIDES_URL,
  USER_URL,
  ORGANIZATION_URL,
  VIDEO_URL,
  GROWTH_ARTICLE_URL,
  // Others
  breadcrumbNameMap,
};
