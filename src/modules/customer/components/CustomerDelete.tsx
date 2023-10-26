import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useDisclosure } from "@/utils/modal";

interface Props {
  id: string;
}

export default function CustomerDelete({ id }: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <>
      <Tooltip title={t("all.delete")}>
        <Button type="dashed" danger onClick={open}>
          <DeleteOutlined />
        </Button>
      </Tooltip>

      <Modal open={isOpen} onCancel={close} onOk={close}></Modal>
    </>
  );
}
