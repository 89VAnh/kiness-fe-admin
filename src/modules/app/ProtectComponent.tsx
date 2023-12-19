import React from "react";
import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";

import { NotAuthorizationPage } from "@/modules/error/403";
import { UserState } from "@/store/auth/atom";
import { checkPermissionTree } from "@/utils/auth";

export default function ProtectedComponent({
  Element,
  title = "Kiness Việt Nam",
  url,
}: {
  Element: any;
  title?: string;
  url: string;
}) {
  const userProfile = useRecoilValue(UserState);

  return (
    <React.Fragment>
      <Helmet>
        <title>{title} | KINESS</title>
      </Helmet>
      {url ? (
        checkPermissionTree(userProfile?.functions, url) ? (
          <Element />
        ) : (
          <NotAuthorizationPage />
        )
      ) : (
        <Element />
      )}
    </React.Fragment>
  );
}
