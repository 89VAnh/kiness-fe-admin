// import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
// import { useEmotionCss } from '@ant-design/use-emotion-css';
// import { history, useModel } from '@umijs/max';
import { Spin } from "antd";
import type { MenuInfo } from "rc-menu/lib/interface";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { LOGIN_URL } from "@/urls";

import HeaderDropdown from "../HeaderDropdown";

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  // const { initialState } = useModel("@@initialState");
  const { currentUser } = { currentUser: { name: "ha" } };
  return <span className="anticon">{currentUser?.name}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
  menu,
  children,
}) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const navigate = useNavigate();
  const loginOut = async () => {
    // await outLogin();
    // const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get("redirect");
    // Note: There may be security issues, please note
    if (window.location.pathname !== LOGIN_URL && !redirect) {
      navigate(LOGIN_URL);
      // history.replace({
      //   pathname: "/user/login",
      //   search: stringify({
      //     redirect: pathname + search,
      //   }),
      // });
    }
  };
  // const actionClassName = useEmotionCss(({ token }) => {
  //   return {
  //     display: "flex",
  //     height: "48px",
  //     marginLeft: "auto",
  //     overflow: "hidden",
  //     alignItems: "center",
  //     padding: "0 8px",
  //     cursor: "pointer",
  //     borderRadius: token.borderRadius,
  //     "&:hover": {
  //       backgroundColor: token.colorBgTextHover,
  //     },
  //   };
  // });
  // const { initialState, setInitialState } = useModel("@@initialState");

  const onMenuClick = useCallback((event: MenuInfo) => {
    const { key } = event;
    if (key === "logout") {
      // flushSync(() => {
      //   setInitialState((s) => ({ ...s, currentUser: undefined }));
      // });
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

  // if (!initialState) {
  //   return loading;
  // }

  // const { currentUser } = initialState;
  const { currentUser } = { currentUser: { name: "ha" } };

  if (!currentUser || !currentUser.name) {
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
