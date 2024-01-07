import {
  IconDocuments,
  IconPackages,
  IconPapers,
  IconStaff,
} from "@/assets/svg";
import {
  BRANCH_URL,
  EMPLOYEE_URL,
  EXPERIENCE_REGISTER_URL,
  REQUEST_URL,
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

export const colorStatistic = [
  {
    key: "experience",
    // title: "Nguyên vật liệu",
    linkTo: EXPERIENCE_REGISTER_URL,
    title: "total_experience",
    color: "#EE7214",
    icon: IconPapers,
    sort: 0,
  },
  {
    key: "employee",
    // title: "Nhân viên",
    linkTo: EMPLOYEE_URL,
    title: "total_employee",
    color: "#304D30",
    icon: IconStaff,
    sort: 1,
  },
  {
    key: "branch",
    // title: "Chi nhánh",
    linkTo: BRANCH_URL,
    title: "total_branch",
    color: "#BF3131",
    icon: IconPackages,
    sort: 2,
  },
  {
    key: "request",
    // title: "Chi nhánh",
    linkTo: REQUEST_URL,
    title: "total_request",
    color: "#38419D",
    icon: IconDocuments,
    sort: 3,
  },
];
