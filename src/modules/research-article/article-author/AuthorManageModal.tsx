import { Button, Modal } from "antd";
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
        onCancel={close}
        onOk={close}
        style={{ top: 58, padding: 0, minWidth: 600 }}
        open={isOpen}
      >
        <ArticleAuthorTable />
      </Modal>
    </>
  );
}
