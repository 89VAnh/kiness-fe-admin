import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { HOME_URL } from "@/urls";

export function NotAuthorizationPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Result
      style={{ paddingTop: 150 }}
      status="403"
      title={t("error.403.title")}
      subTitle={t("error.403.subTitle")}
      extra={
        <Button type="primary" onClick={backHome}>
          {t("error.backHome")}
        </Button>
      }
    />
  );

  function backHome() {
    navigate(HOME_URL);
  }
}
