import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { Form, Typography, notification, theme } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/img/logo/logo.png";
import { ERROR_TIMEOUT, LOCAL_USER } from "@/constant/config";
import { useMailNewPw } from "@/loader/email.loader";
import { useLogin } from "@/loader/user.loader";
import { EXPERIENCE_REGISTER_URL, LOGIN_URL } from "@/urls";
import storage, { storageService } from "@/utils/storage";
import { RULES_FORM } from "@/utils/validator";

type LoginType = "phone" | "account";

const Page = () => {
  const { t } = useTranslation("translation", { keyPrefix: "messages" });
  const [loginType, setLoginType] = useState<LoginType>("account");
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const login = useLogin({
    config: {
      onSuccess: (data, variables) => {
        if (data.message === ERROR_TIMEOUT) {
          login.mutate(variables);
          return;
        }
        if (!data || data?.message) {
          notification.error({
            message: data.response?.data?.message || t("login_failure"),
          });
          return navigate(LOGIN_URL);
        } else {
          storage.setToken(data.token);
          storageService.setStorage(LOCAL_USER, JSON.stringify(data));
          notification.success({
            message: t("login_success"),
            description: "Đang chuyển hướng...",
            duration: 0.6,
          });
          setTimeout(() => {
            navigate(EXPERIENCE_REGISTER_URL, {
              replace: true,
              preventScrollReset: true,
            });
          }, 600);
        }
      },
      onError: (data) => {
        notification.error({
          message: data.response?.data?.message || t("login_failure"),
        });
      },
    },
  });

  const mailNewPw = useMailNewPw({
    config: {
      onSuccess: (data, variables) => {
        if (data.message === ERROR_TIMEOUT) {
          mailNewPw.mutate(variables);
        }
        if (!data || data?.message) {
          notification.error({
            message: data.response?.data?.message || t("fpw_failure"),
          });
        } else {
          notification.success({
            message: t("fpw_success"),
            description:
              "Đã gửi email quên mật khẩu! Vui lòng khiểm tra hòm thư của bạn!",
          });
        }
      },
      onError: (data) => {
        notification.error({
          message: data.response?.data?.message || t("fpw_failure"),
        });
      },
    },
  });

  const handleLogin = async () => {
    form.validateFields().then((values) => {
      login.mutate(values);
    });
  };

  const handleNewPw = async () => {
    form.validateFields().then((values) => {
      // mailNewPw.mutate({ ...values, url: "http://localhost:7845" });
      mailNewPw.mutate({ ...values, url: window.location.hostname });
    });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <LoginFormPage
        form={form}
        backgroundImageUrl="https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr"
        logo={logo}
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title={"Kiness Việt Nam"}
        containerStyle={{
          backgroundColor: "rgba(255, 255, 255)",
          backdropFilter: "blur(4px)",
        }}
        subTitle={loginType === "account" ? "Đăng nhập" : "Quên mật khẩu"}
        submitter={{
          searchConfig: {
            submitText: loginType === "account" ? "Đăng nhập" : "Quên mật khẩu",
          },
        }}
        // activityConfig={{
        //   style: {
        //     boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
        //     color: token.colorTextHeading,
        //     borderRadius: 8,
        //     backgroundColor: "rgba(255,255,255,0.45)",
        //     backdropFilter: "blur(4px)",
        //   },
        //   title: "KINESS Việt Nam",
        //   subTitle: "Dự án tăng chiều cao",
        //   action: (
        //     <Typography.Link href={KINESS_URL} target="_blank">
        //       <Button
        //         size="large"
        //         style={{
        //           borderRadius: 20,
        //           background: token.colorBgElevated,
        //           color: token.colorPrimary,
        //           width: 120,
        //         }}
        //       >
        //         Kiness
        //       </Button>
        //     </Typography.Link>
        //   ),
        // }}
        onFinish={async () => {
          if (loginType === "account") {
            handleLogin();
          } else {
            handleNewPw();
          }
        }}
        loading={login.isLoading || mailNewPw.isLoading}
      >
        {loginType === "account" ? (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Tài khoản / Email"}
              rules={[...RULES_FORM.required]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Mật khẩu"}
              rules={[...RULES_FORM.required]}
            />
          </>
        ) : (
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Nhập email của bạn"}
              rules={[...RULES_FORM.required, ...RULES_FORM.email]}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          {loginType === "account" ? (
            <>
              <ProFormCheckbox initialValue={true} noStyle name="autoLogin">
                Nhớ tài khoản
              </ProFormCheckbox>
              <Typography.Link
                onClick={() => setLoginType("phone")}
                style={{
                  float: "right",
                }}
              >
                Quên mật khẩu?
              </Typography.Link>
            </>
          ) : (
            <>
              <Typography.Link
                onClick={() => setLoginType("account")}
                style={{
                  float: "right",
                  marginBottom: 16,
                }}
              >
                Đã nhớ ra mật khẩu? Đăng nhập ngay
              </Typography.Link>
            </>
          )}
        </div>
      </LoginFormPage>
    </div>
  );
};

export default function Login() {
  return (
    <ProConfigProvider>
      <Page />
    </ProConfigProvider>
  );
}
