import { LoginFormPage } from "@ant-design/pro-components";
import { Typography } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

import logo from "@/assets/img/logo/logo.png";
import { useGetNewPw } from "@/loader/employee.loader";
import { LOGIN_URL } from "@/urls";

export default function NewPw() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { data: newPw } = useGetNewPw({
    token: searchParams.get("token") || "",
  });

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr"
        logo={logo}
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title={"Kiness Việt Nam"}
        containerStyle={{
          backgroundColor: "rgba(255, 255, 255)",
          backdropFilter: "blur(4px)",
        }}
        subTitle={"Mật khẩu mới"}
        submitter={{
          onSubmit: () => {
            navigate(LOGIN_URL, {
              replace: true,
              preventScrollReset: true,
            });
          },
        }}
      >
        <Typography.Title level={4} style={{ textAlign: "center" }}>
          Mật khẩu mới của bạn là :
        </Typography.Title>
        <Typography.Title
          style={{ textAlign: "center", paddingBottom: 30 }}
          level={3}
        >
          {newPw?.data}
        </Typography.Title>
        <Typography.Title level={5} style={{ textAlign: "center" }}>
          Vui lòng đăng nhập lại!
        </Typography.Title>
      </LoginFormPage>
    </div>
  );
}
