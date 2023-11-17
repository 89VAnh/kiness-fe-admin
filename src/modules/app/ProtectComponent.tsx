import React from "react";
import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";

import { NotAuthorizationPage } from "@/modules/error/403";
import { UserState } from "@/store/auth/atom";

export default function ProtectedComponent({
  Element,
  title = "Kiness Việt Nam",
  role,
}: {
  Element: any;
  title?: string;
  url?: string;
  role?: number;
}) {
  const userProfile = useRecoilValue(UserState);

  // return userProfile.user_id || url ? <Element /> : <NotAuthorizationPage />;

  const checkPermission = () => {
    return !role || userProfile.position_id === role;
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{title} | KINESS</title>
      </Helmet>
      {checkPermission() ? <Element /> : <NotAuthorizationPage />}
    </React.Fragment>
  );
}
