import { HOME_URL } from "@/urls";

import storage, { storageService } from "./storage";

export const handleLogout = () => {
  storage.clearToken();
  storageService.clearStorage("user");

  window.open(HOME_URL, "_parent");
};

export const checkPermissionTree = (tree: any[] = [], url: string): boolean => {
  const stack: any[] = [...tree];

  while (stack.length > 0) {
    const node = stack.pop();

    if (node?.["url"] === url) {
      return true;
    }

    if (node?.children) {
      stack.push(...node.children);
    }
  }

  return false;
};
