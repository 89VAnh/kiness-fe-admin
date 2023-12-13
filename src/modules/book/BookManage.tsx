import { Col, Row } from "antd";

import BookPage from "./book/Book";
import BookAuthorPage from "./book_author/BookAuthor";

export default function BookManage(): JSX.Element {
  return (
    <Row gutter={16}>
      <Col span={24} xl={16} style={{ marginBottom: 16 }}>
        <BookPage />
      </Col>
      <Col span={24} xl={8}>
        <BookAuthorPage />
      </Col>
    </Row>
  );
}
