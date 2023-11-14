import { Card, Col, Row, Typography } from "antd";

import BulletCustom from "../charts/BulletCustom";
import LineCustom from "../charts/LineCustom";
import TinyAreaCustom from "../charts/TinyAreaCustom";
import TinyColumnCustom from "../charts/TinyColumnCustom";

export default function StatisticCard(): JSX.Element {
  const dataTinyArea = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];

  const dataTinyColumn = [274, 337, 81, 497, 666, 219, 269, 73];

  return (
    <Row gutter={16}>
      <Col span={24} md={12} lg={6}>
        <Card bodyStyle={{ padding: "8px 12px" }}>
          <Typography.Title level={3}>Statistic 1</Typography.Title>
          <div style={{ height: 200 }}>
            <TinyAreaCustom data={dataTinyArea} />
          </div>
        </Card>
      </Col>
      <Col span={24} md={12} lg={6}>
        <Card bodyStyle={{ padding: "8px 12px" }}>
          <Typography.Title level={3}>Statistic 2</Typography.Title>
          <div style={{ height: 200 }}>
            <TinyColumnCustom data={dataTinyColumn} />
          </div>
        </Card>
      </Col>
      <Col span={24} md={12} lg={6}>
        <Card bodyStyle={{ padding: "8px 12px" }}>
          <Typography.Title level={3}>Statistic 3</Typography.Title>
          <div style={{ height: 200 }}>
            <BulletCustom />
          </div>
        </Card>
      </Col>
      <Col span={24} md={12} lg={6}>
        <Card bodyStyle={{ padding: "8px 12px" }}>
          <Typography.Title level={3}>Statistic 4</Typography.Title>
          <div style={{ height: 200 }}>
            <LineCustom />
          </div>
        </Card>
      </Col>
    </Row>
  );
}
