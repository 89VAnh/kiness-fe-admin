import { Breadcrumb } from "antd";
import { t } from "i18next";
import { useLocation } from "react-router-dom";

import { routes } from "@/modules/app/AppRouter";

export default function MyBreadcrumb() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const r = routes(t);

  const breadcrumbItems = pathSnippets.map((item, index) => {
    return (
      <Breadcrumb.Item key={item}>
        {r.find((x) => x.path === `/${item}`)?.name}
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb style={{ padding: "10px 0" }}>{breadcrumbItems}</Breadcrumb>
  );
}
