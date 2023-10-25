import { atom } from "recoil";

export const UserState = atom({
  key: "UserState",
  default: {
    user_id: "",
    user_name: "",
    full_name: "",
  },
});
