import { Button, Modal, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { useDisclosure } from "@/utils/modal";

import ArticleAuthorTable from "./components/AuthorTable";

export default function AuthorManageModal(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "research_article.author",
  });
  const { open, close, isOpen } = useDisclosure();

  return (
    <>
      <Button onClick={open}>{t("title")}</Button>
      <Modal
        title={<Typography.Title level={3}>{t("title")}</Typography.Title>}
        onCancel={close}
        onOk={close}
        maskClosable={false}
        style={{ top: 58, padding: 0, minWidth: 1000 }}
        open={isOpen}
      >
        <ArticleAuthorTable />
      </Modal>
    </>
  );
}
