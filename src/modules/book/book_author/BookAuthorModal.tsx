import { Button, Modal, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { useDisclosure } from "@/utils/modal";

import BookAuthorTable from "./components/AuthorTable";

export default function BookAuthorModal() {
  const { t } = useTranslation("translation", {
    keyPrefix: "book.author",
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
        <BookAuthorTable />
      </Modal>
    </>
  );
}
