import { Button, Modal, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { useDisclosure } from "@/utils/modal";

import TopicFaqTable from "./components/TopicFaqTable";

export default function TopicFaqModal(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "faq.topic" });
  const { open, close, isOpen } = useDisclosure();

  return (
    <>
      <Button onClick={open}>{t("title")}</Button>
      <Modal
        title={<Typography.Title level={3}>{t("title")}</Typography.Title>}
        onCancel={close}
        onOk={close}
        style={{ top: 58, padding: 0, minWidth: 1000 }}
        maskClosable={false}
        open={isOpen}
      >
        <TopicFaqTable />
      </Modal>
    </>
  );
}
