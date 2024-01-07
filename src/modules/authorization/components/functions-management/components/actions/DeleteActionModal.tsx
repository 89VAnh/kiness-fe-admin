import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
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
}

export function DeleteActionModal({ id }: Props): JSX.Element {
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
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        // confirmLoading={deleteFee.isLoading}
      >
        Hành động này sẽ làm mất dữ liệu hiện tại. Tiếp tục?
      </Modal>
    </>
  );
}
