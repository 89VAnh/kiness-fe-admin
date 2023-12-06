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

export const colorStatistic = {
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
  branch: {
    // title: "Chi nhánh",
    linkTo: BRANCH_URL,
    title: "total_branch",
    color: "#3AA966",
    icon: IconPackages,
  },
  request: {
    // title: "Chi nhánh",
    linkTo: REQUEST_URL,
    title: "total_request",
    color: "#13aedf",
    icon: IconDocuments,
  },
};
