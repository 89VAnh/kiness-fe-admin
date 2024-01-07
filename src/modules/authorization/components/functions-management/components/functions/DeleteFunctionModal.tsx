import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import { CACHE_FUNCTION, useDeleteFunction } from "@/loader/function.loader";
import { getFunctionIdSelector } from "@/modules/authorization/store/state";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

import styles from "../../../../scss/styles.module.scss";

export function DeleteFunctionModal(): JSX.Element {
  const { isOpen, close, open } = useDisclosure();
  const function_id = useRecoilValue(getFunctionIdSelector);
  const userRecoil = useRecoilValue(UserState);
  const { t } = useTranslation();

  const deleteFunction = useDeleteFunction({
    config: {
      onSuccess: () => {
        notification.success({
          message: t("messages.delete_success"),
        });
        queryClient.invalidateQueries([CACHE_FUNCTION.SEARCH]);
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
    deleteFunction.mutate({
      list_json: [{ function_id }],
      updated_by_id: userRecoil.user_id,
    });
  };

  return (
    <>
      <Tooltip title={t("authorization.tooltip.btn_delete")}>
        <Button type="default" disabled={!function_id} onClick={handleOpen}>
          <DeleteOutlined style={{ color: "#ff4d4f" }} />
        </Button>
      </Tooltip>
      <Modal
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        title={t("authorization.functions.modal.title_delete")}
        width={"30%"}
        okText={t("all.btn_confirm")}
        cancelText={t("all.btn_cancel")}
        onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
        confirmLoading={deleteFunction.isLoading}
        className={styles.modal + " modal-delete"}
      >
        Hành động này sẽ làm mất dữ liệu hiện tại. Tiếp tục?
      </Modal>
    </>
  );
}
