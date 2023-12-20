import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

import styles from "../../scss/styles.module.scss";
import ActionTable from "./components/actions/ActionTable";
import FunctionTable from "./components/functions/FunctionTable";

export default function ListFunction(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="box-for-all">
      <Col span={16} className={styles.padding_none}>
        <Typography.Title level={3}>
          {t("authorization.functions.title")}
        </Typography.Title>
      </Col>
      <Row gutter={16}>
        <Col span={7}>
          <div className={"content-table"}>
            <FunctionTable />
          </div>
        </Col>
        <Col span={17}>
          <div className="content-table">
            <ActionTable />
          </div>
        </Col>
      </Row>
    </div>
  );
}
