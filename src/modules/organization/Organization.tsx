import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

import OrganizationTable from "./components/OrganizationTable";

export default function Organization(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div>
      <Col span={16}>
        <Typography.Title level={3}>{t("organization.title")}</Typography.Title>
      </Col>
      <Row gutter={16}>
        <Col span={7}>
          <OrganizationTable />
        </Col>
      </Row>
    </div>
  );
}
