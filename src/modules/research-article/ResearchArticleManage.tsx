import { Col, Row } from "antd";

import AuthorPage from "./article-author/Author";
import ResearchArticle from "./research-article/ResearchArticle";

export default function ResearchArticleManage(): JSX.Element {
  return (
    <Row gutter={16}>
      <Col span={24} xl={16} style={{ marginBottom: 16 }}>
        <ResearchArticle />
      </Col>
      <Col span={24} xl={8}>
        <AuthorPage />
      </Col>
    </Row>
  );
}
