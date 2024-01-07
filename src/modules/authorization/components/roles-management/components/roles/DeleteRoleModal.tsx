import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import { CACHE_ROLE, useDeleteRole } from "@/loader/role.loader";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

import styles from "../../../../scss/styles.module.scss";

interface Props {
  id: string | number;
}

export function DeleteRoleModal({ id }: Props): JSX.Element {
  const { isOpen, close, open } = useDisclosure();
  const userRecoil = useRecoilValue(UserState);
  const { t } = useTranslation();

  const deleteRole = useDeleteRole({
    config: {
      onSuccess: () => {
        notification.success({
          message: t("messages.delete_success"),
        });
        queryClient.invalidateQueries([CACHE_ROLE.SEARCH]);
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
    deleteRole.mutate({
      list_json: [{ role_id: id }],
      updated_by_id: userRecoil.user_id,
    });
  };

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
        title={t("authorization.roles.modal.title_delete")}
        open={isOpen}
        width={"30%"}
        okText={t("all.btn_confirm")}
        cancelText={t("all.btn_cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        confirmLoading={deleteRole.isLoading}
      >
        Hành động này sẽ làm mất dữ liệu hiện tại. Tiếp tục?
      </Modal>
    </>
  );
}
