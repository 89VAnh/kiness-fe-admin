const HOME_URL = "/dashboard";

// Auth
const LOGIN_URL = "/login";

// Nav
const NEWS_URL = "/news";
const CUSTOMERS_URL = "/customers";
const PAGE_URL = "/pages";
const EXPERIENCE_REGISTER_URL = "/experience-register";

const breadcrumbNameMap: Record<string, string> = {
  [HOME_URL]: "Trang chủ",
};

export {
  CUSTOMERS_URL,
  EXPERIENCE_REGISTER_URL,
  HOME_URL,
  LOGIN_URL,
  NEWS_URL,
  PAGE_URL,
  breadcrumbNameMap,
};
