import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import { CACHE_DIAGRAM, useDeleteDiagram } from "@/loader/diagram.loader";
import { IDiagram } from "@/models/diagram";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

import styles from "../scss/organ.module.scss";

interface Props {
  node: IDiagram | undefined;
}

export function DeleteOrganizationModal({ node }: Props): JSX.Element {
  const { isOpen, close, open } = useDisclosure();
  const userRecoil = useRecoilValue(UserState);
  const { t } = useTranslation();

  const deleteDiagram = useDeleteDiagram({
    config: {
      onSuccess: () => {
        notification.success({
          message: t("messages.delete_success"),
        });
        queryClient.invalidateQueries([CACHE_DIAGRAM.SEARCH]);
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
    deleteDiagram.mutate({
      list_json: [{ node_id: node?.key }],
      updated_by_id: userRecoil.user_id,
    });
  };

  return (
    <>
      <Tooltip title={t("authorization.tooltip.btn_delete")}>
        <Button type="default" disabled={!node?.key} onClick={handleOpen}>
          <DeleteOutlined style={{ color: "#ff4d4f" }} />
        </Button>
      </Tooltip>
      <Modal
        centered
        open={isOpen}
        title={t("authorization.functions.modal.title_delete")}
        width={"30%"}
        okText={t("all.btn_confirm")}
        cancelText={t("all.btn_cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        confirmLoading={deleteDiagram.isLoading}
        className={styles.modal + " modal-delete"}
      >
        Hành động này sẽ làm mất dữ liệu hiện tại. Tiếp tục?
      </Modal>
    </>
  );
}
