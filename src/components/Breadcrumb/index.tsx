import { Breadcrumb } from "antd";
import { t } from "i18next";
import { useLocation } from "react-router-dom";

import { routes } from "@/modules/app/AppRouter";

export default function MyBreadcrumb() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const r = routes(t);

  const breadcrumbItems = pathSnippets.map((item, index) => {
    return r.find((x) => x.path === `/${item}`)?.name;
  });

  // return <Breadcrumb style={{ padding: "10px 0" }} items={breadcrumbItems} />;
  return <></>;
}
