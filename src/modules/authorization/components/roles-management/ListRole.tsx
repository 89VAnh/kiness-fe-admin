import { Col, Row, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "../../scss/styles.module.scss";
import ActionTable from "./components/actions/ActionTable";
import RoleTable from "./components/roles/RoleTable";

export function ListRole(): JSX.Element {
  const { t } = useTranslation();
  const [dataChecked, setDataChecked] = useState<any[]>([]);

  return (
    <div className="box-for-all">
      <Row justify={"space-between"} gutter={16}>
        <Col span={16} className={styles.padding_none}>
          <Typography.Title level={3}>
            {t("authorization.roles.title")}
          </Typography.Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={7}>
          <div className={"content-table"}>
            <RoleTable
              dataChecked={dataChecked}
              setDataChecked={setDataChecked}
            />
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
