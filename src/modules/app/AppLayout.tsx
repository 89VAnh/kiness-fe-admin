import { ProLayout, ProLayoutProps } from "@ant-design/pro-components";
import { Image, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Logo from "@/assets/img/logo/logo.png";
import avatar from "@/assets/img/others/default-avatar.png";
import "@/assets/scss/index.scss";
import MyBreadcrumb from "@/components/Breadcrumb";
import { Question, SelectLang } from "@/components/RightContent";
import {
  AvatarDropdown,
  AvatarName,
} from "@/components/RightContent/AvatarDropdown";
import { UserState } from "@/store/auth/atom";
import { HOME_URL } from "@/urls";

import { appRoute } from "./AppRouter";

interface Props {
  children?: React.ReactNode;
}

const settings: ProLayoutProps = {
  fixedHeader: true,
  fixSiderbar: true,
  layout: "mix",
  contentWidth: "Fluid",
};
export default function AppLayout({ children }: Props): JSX.Element {
  const { t } = useTranslation();
  const location = useLocation();
  const userProfile = useRecoilValue(UserState);

  if (location.pathname === "/") {
    return <Navigate to={HOME_URL} />;
  }

  return (
    <ProLayout
      actionsRender={() => [
        <Question key="doc" />,
        <SelectLang key="SelectLang" />,
      ]}
      breadcrumbRender={(routes) => {
        return routes;
      }}
      menuHeaderRender={undefined}
      avatarProps={{
        src: avatar,
        title: <AvatarName />,
        render: (_, avatarChildren) => {
          return <AvatarDropdown menu>{avatarChildren}</AvatarDropdown>;
        },
      }}
      style={{
        height: "100vh",
      }}
      siderWidth={258}
      location={location}
      logo={
        <Space>
          <Image className="logo" preview={false} src={Logo} />
        </Space>
      }
      title={""}
      menu={{
        collapsedShowGroupTitle: true,
        defaultOpenAll: true,
        type: "group",
      }}
      headerTitleRender={(_, __, ___) => (
        <Space>
          <Link to={HOME_URL}>
            <Image className="logo" preview={false} src={Logo} />
          </Link>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Hệ thống quản trị nội dung Kiness Việt Nam
          </Typography.Title>
        </Space>
      )}
      route={appRoute(t, userProfile)}
      {...settings}
    >
      <MyBreadcrumb />
      <Outlet />
      {children}
    </ProLayout>
  );
}
