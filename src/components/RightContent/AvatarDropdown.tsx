// import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
// import { useEmotionCss } from '@ant-design/use-emotion-css';
// import { history, useModel } from '@umijs/max';
import { Spin } from "antd";
import type { MenuInfo } from "rc-menu/lib/interface";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

import { LOCAL_USER } from "@/constant/config";
import { authorization } from "@/services/user.service";
import { UserState } from "@/store/auth/atom";
import { LOGIN_URL } from "@/urls";
import { storageService } from "@/utils/storage";

import HeaderDropdown from "../HeaderDropdown";

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const [userProfile] = useRecoilState(UserState);
  return <span>{userProfile?.full_name || userProfile?.user_name}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
  menu,
  children,
}) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useRecoilState(UserState);
  const resetUserProfile = useResetRecoilState(UserState);

  useEffect(() => {
    (async () => {
      const userLocal = storageService.getStorage(LOCAL_USER);
      if (!userLocal.user_id) {
        resetUserProfile();
        return;
      }
      const user = await authorization();
      if (user) setUserProfile(userLocal);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginOut = async () => {
    const urlParams = new URL(window.location.href).searchParams;
    const redirect = urlParams.get("redirect");
    if (window.location.pathname !== LOGIN_URL && !redirect) {
      navigate(LOGIN_URL);
    }
  };

  const onMenuClick = useCallback((event: MenuInfo) => {
    const { key } = event;
    if (key === "logout") {
      loginOut();
      return;
    }
    navigate(`/account/${key}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = (
    <span className={"actionClassName"}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!userProfile.user_id) {
    return loading;
  }

  if (!userProfile.user_id || !userProfile.user_id) {
    return loading;
  }

  const menuItems = [
    ...(menu
      ? [
          {
            key: "center",
            icon: <UserOutlined />,
            label: "Thông tin người dùng",
          },
          {
            type: "divider" as const,
          },
        ]
      : []),
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
