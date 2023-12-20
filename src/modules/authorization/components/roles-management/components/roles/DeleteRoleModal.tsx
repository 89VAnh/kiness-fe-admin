import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { useDisclosure } from "@/utils/modal";

import styles from "../../../../scss/styles.module.scss";

// import { queryClient } from "@/lib/react-query";

interface Props {
  id: string | number;
  name: string;
}

export function DeleteRoleModal({ id, name }: Props): JSX.Element {
  const { isOpen, close, open } = useDisclosure();
  const { t } = useTranslation();

  const handleOpen = () => {
    open();
  };

  const handleCancel = () => {
    close();
  };

  const handleOk = () => {};

  console.log(id);

  return (
    <>
      <Tooltip title={t("authorization.tooltip.btn_delete")}>
        <Button
          size="small"
          type="default"
          onClick={handleOpen}
          className={styles.center}
        >
          <DeleteOutlined style={{ color: "#ff4d4f" }} />
        </Button>
      </Tooltip>
      <Modal
        centered
        title={t("authorization.functions.modal.title_delete")}
        open={isOpen}
        width={"30%"}
        okText={t("all.btn_confirm")}
        cancelText={t("all.btn_cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
        // confirmLoading={deleteFee.isLoading}
      >
        <div
          style={{
            textAlign: "center",
            fontWeight: "700",
            margin: "2rem 5rem",
          }}
        >
          <Typography.Text
            // level={4}
            style={{ fontSize: "1.1rem" }}
          >{`Bạn có muốn xoá `}</Typography.Text>
          <Typography.Text type="danger" style={{ fontSize: "1.1rem" }}>
            {name}{" "}
          </Typography.Text>
          ?
        </div>
      </Modal>
    </>
  );
}
