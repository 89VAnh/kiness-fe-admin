import {
  IconDocuments,
  IconPackages,
  IconPapers,
  IconStaff,
  IconUsers,
} from "@/assets/svg";
import {
  BRANCH_REGISTER_URL,
  BRANCH_URL,
  CUSTOMERS_URL,
  EMPLOYEE_URL,
  EXPERIENCE_REGISTER_URL,
  NEWS_URL,
  TEST_REGISTER_URL,
} from "@/urls";

export const dataStatistic = {
  customer: {
    value: 50,
  },
  co: {
    value: 1523,
  },
  product: {
    value: 1200,
  },
  material: {
    value: 5680,
  },
  employee: {
    value: 20,
  },
};

export const colorStatistic = {
  customer: {
    // title: "Khách hàng",
    linkTo: CUSTOMERS_URL,
    title: "total_customer",
    color: "#1890FF",
    icon: IconUsers,
  },
  // branch: {
  //   // title: "Hồ sơ CO",
  //   linkTo: BRANCH_REGISTER_URL,
  //   title: "total_branch",
  //   color: "#13AEDF",
  //   icon: IconDocuments,
  // },
  test: {
    // title: "Sản phẩm",
    linkTo: TEST_REGISTER_URL,
    title: "total_test",
    color: "#3AA966",
    icon: IconPackages,
  },
  experience: {
    // title: "Nguyên vật liệu",
    linkTo: EXPERIENCE_REGISTER_URL,
    title: "total_experience",
    color: "#F4AA3A",
    icon: IconPapers,
  },
  employee: {
    // title: "Nhân viên",
    linkTo: EMPLOYEE_URL,
    title: "total_employee",
    color: "#17CCB6",
    icon: IconStaff,
  },
  news: {
    // title: "Nhân viên",
    linkTo: NEWS_URL,
    title: "total_news",
    color: "#17CCC8",
    icon: IconDocuments,
  },
  branch: {
    // title: "Chi nhánh",
    linkTo: BRANCH_URL,
    title: "total_branch",
    color: "#3AA966",
    icon: IconDocuments,
  },
};
