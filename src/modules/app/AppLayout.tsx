import { CheckOutlined } from "@ant-design/icons";
import { ProLayout, ProLayoutProps } from "@ant-design/pro-components";
import { ConfigProvider, Image, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Logo from "@/assets/img/logo/logo-white.png";
import avatar from "@/assets/img/others/default-avatar.png";
import "@/assets/scss/index.scss";
import MyBreadcrumb from "@/components/Breadcrumb";
import { Question, SelectLang } from "@/components/RightContent";
import {
  AvatarDropdown,
  AvatarName,
} from "@/components/RightContent/AvatarDropdown";
import { BASE_URL, LOCAL_COLOR } from "@/constant/config";
import { UserState } from "@/store/auth/atom";
import { HOME_URL } from "@/urls";
import { storageService } from "@/utils/storage";

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

const listColors = [
  "#1c4093",
  "#0bc9bd",
  "#31304D",
  "#AA5656",
  "#2D9596",
  "#860A35",
];

export default function AppLayout({ children }: Props): JSX.Element {
  const location = useLocation();
  const userProfile = useRecoilValue(UserState);
  const [primary, setPrimary] = useState(
    () => storageService.getStorage(LOCAL_COLOR, false) || listColors[0],
  );

  useEffect(() => {
    handleChangeColor(
      storageService.getStorage(LOCAL_COLOR, false) || listColors[0],
    )();
  }, []);

  const handleChangeColor = (color: string) => () => {
    if (color) {
      setPrimary(color);
      const root = document.documentElement;
      root.style.setProperty("--color-primary", color);
      storageService.setStorage(LOCAL_COLOR, color);
    }
  };

  if (location.pathname === "/")
    return <Navigate to={HOME_URL} replace relative="route" />;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primary,
          colorTextHeading: primary,
        },
      }}
    >
      <ProLayout
        actionsRender={() => [
          <Question key="doc" />,
          <SelectLang key="SelectLang" />,
        ]}
        breadcrumbRender={(routes) => {
          return routes;
        }}
        menuHeaderRender={undefined}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <div className="color-picker">
              <Space>
                {listColors.map((color, index) => (
                  <div
                    className="color-wrap"
                    key={index}
                    onClick={handleChangeColor(color)}
                  >
                    <div
                      className="color-item"
                      style={{ backgroundColor: color }}
                    >
                      {color === primary && (
                        <CheckOutlined style={{ color: "#fff" }} />
                      )}
                    </div>
                  </div>
                ))}
              </Space>
            </div>
          );
        }}
        avatarProps={{
          src: userProfile.avatar
            ? `${BASE_URL}/${userProfile.avatar}`
            : avatar,
          title: <AvatarName />,
          render: (_, avatarChildren) => {
            return <AvatarDropdown menu>{avatarChildren}</AvatarDropdown>;
          },
        }}
        style={{
          height: "100vh",
        }}
        siderWidth={298}
        location={location}
        logo={
          <Space>
            <Image className="logo" preview={false} src={Logo} />
          </Space>
        }
        suppressSiderWhenMenuEmpty={true}
        title={""}
        menu={{
          loading: userProfile.functions.length > 0 ? false : true,
          collapsedShowTitle: false,
          type: "sub",
          // defaultOpenAll: true,
        }}
        headerTitleRender={(_, __, ___) => (
          <Space>
            <Link preventScrollReset to={HOME_URL}>
              <Image className="logo" preview={false} src={Logo} />
            </Link>
            <Typography.Title
              level={3}
              style={{ margin: 0 }}
              className="header-caption"
            >
              HỆ THỐNG QUẢN TRỊ NỘI DUNG KINESS VIỆT NAM
            </Typography.Title>
          </Space>
        )}
        route={appRoute(userProfile.functions)}
        {...settings}
      >
        <MyBreadcrumb />
        <Outlet />
        {children}
      </ProLayout>
    </ConfigProvider>
  );
}
