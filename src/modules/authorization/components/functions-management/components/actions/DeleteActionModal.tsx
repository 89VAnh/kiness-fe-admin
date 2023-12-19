import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, Typography, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import { CACHE_ACTION, useDeleteAction } from "@/loader/action.loader";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

// import { queryClient } from "@/lib/react-query";
import styles from "../../../../scss/styles.module.scss";

interface Props {
  id: string;
  name: string;
}

export function DeleteActionModal({ id, name }: Props): JSX.Element {
  const { isOpen, close, open } = useDisclosure();
  const userRecoil = useRecoilValue(UserState);
  const { t } = useTranslation();

  const deleteAction = useDeleteAction({
    config: {
      onSuccess: () => {
        notification.success({
          message: t("messages.delete_success"),
        });
        queryClient.invalidateQueries([CACHE_ACTION.SEARCH]);
        close();
      },
      onError: () => {
        notification.error({ message: t("messages.delete_failure") });
      },
    },
  });

  const handleOpen = () => {
    open();
  };

  const handleCancel = () => {
    close();
  };

  const handleOk = () => {
    deleteAction.mutate({
      list_json: [{ action_code: id }],
      updated_by_id: userRecoil.user_id,
    });
  };

  return (
    <>
      <Tooltip title={t("authorization.tooltip.btn_delete")}>
        <Button
          type="default"
          size="small"
          onClick={handleOpen}
          className={styles.center}
        >
          <DeleteOutlined
            style={{
              color: "#ff4d4f",
              cursor: "pointer",
            }}
          />
        </Button>
      </Tooltip>
      <Modal
        centered
        title={t("authorization.actions.modal.title_delete")}
        open={isOpen}
        width={"30%"}
        okText={t("all.btn_confirm")}
        cancelText={t("all.btn_cancel")}
        destroyOnClose
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
