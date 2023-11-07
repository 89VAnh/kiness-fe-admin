import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useTranslation } from "react-i18next";

import { useDisclosure } from "@/utils/modal";

interface Props {
  id?: number;
  isCreate?: boolean;
}

export default function ExperienceRegisterModal({
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();

  return (
    <>
      {isCreate ? (
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={open}
          type="primary"
        >
          {t("all.btn_add")}
        </Button>
      ) : (
        <Tooltip title={t("all.edit")}>
          <Button type="dashed" onClick={open} style={{ color: "#faad14" }}>
            <EditOutlined />
          </Button>
        </Tooltip>
      )}
      <Modal
        title={t("customer.title_update")}
        open={isOpen}
        onCancel={close}
        onOk={close}
      ></Modal>
    </>
  );
}
