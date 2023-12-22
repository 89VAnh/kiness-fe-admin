import { Col, Row } from "antd";

import BranchTable from "./branch/components/BranchTable";
import CityPage from "./city/City";

export default function BranchManage(): JSX.Element {
  return (
    <Row gutter={16}>
      <Col span={24} xl={16} style={{ marginBottom: 16 }}>
        <BranchTable />
      </Col>
      <Col span={24} xl={8}>
        <CityPage />
      </Col>
    </Row>
  );
}
