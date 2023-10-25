import { HOME_URL } from "@/urls";

import storage, { storageService } from "./storage";

export const handleLogout = () => {
  storage.clearToken();
  storageService.clearStorage("user");

  window.open(HOME_URL, "_parent");
};
