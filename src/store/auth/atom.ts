import { atom } from "recoil";

export const UserState = atom({
  key: "UserState",
  default: {
    user_id: "",
    user_name: "",
    full_name: "",
    position_id: 0,
    functions: [],
    actions: [],
  },
});
