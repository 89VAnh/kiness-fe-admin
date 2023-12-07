import { Col, Row } from "antd";

import FaqListManage from "./faq-list/FaqListManage";
import TopicFaqManage from "./topic-faq/TopicFaqManage";

export default function FaqManage(): JSX.Element {
  return (
    <Row gutter={16}>
      <Col span={24} xl={16} style={{ marginBottom: 16 }}>
        <FaqListManage />
      </Col>
      <Col span={24} xl={8}>
        <TopicFaqManage />
      </Col>
    </Row>
  );
}
