import { DefaultOptionType } from "antd/es/select";

export const acceptOptions: DefaultOptionType[] = [
  {
    label: "Tất cả trạng thái xác minh",
    value: "",
  },
  {
    label: "Đã xác minh",
    value: 1,
  },
  {
    label: "Chưa xác minh",
    value: 0,
  },
];

export const answerOptions: DefaultOptionType[] = [
  {
    label: "Tất cả trạng thái trả lời",
    value: "",
  },
  {
    label: "Đã trả lời",
    value: 1,
  },
  {
    label: "Chưa trả lời",
    value: 0,
  },
];
