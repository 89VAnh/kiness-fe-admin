import { Button, Modal, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { useDisclosure } from "@/utils/modal";

import CityTable from "./components/CityTable";

export default function CityModal(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "city",
  });
  const { open, close, isOpen } = useDisclosure();

  return (
    <>
      <Button onClick={open}>{t("title")}</Button>
      <Modal
        title={<Typography.Title level={3}>{t("title")}</Typography.Title>}
        onCancel={close}
        onOk={close}
        style={{ top: 58, padding: 0, minWidth: 1000 }}
        open={isOpen}
      >
        <CityTable />
      </Modal>
    </>
  );
}
