import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import { CACHE_POSITION, useDeletePosition } from "@/loader/position.loader";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: number;
}

export default function PositionDelete({ id }: Props): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "position" });
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);

  const deletePosition = useDeletePosition({
    config: {
      onSuccess: (data: any) => {
        console.log(data);

        if (data.results) {
          notification.success({
            message: data.message,
          });
        } else {
          notification.error({
            message: data.message,
          });
        }

        queryClient.invalidateQueries([CACHE_POSITION.POSITION]);
        close();
      },
      onError: (err) => {
        notification.error({
          message: t("message.delete_failure"),
          description: err.message,
        });
      },
    },
  });

  return (
    <>
      <Tooltip title={t("title_delete")}>
        <Button type="dashed" danger onClick={open}>
          <DeleteOutlined />
        </Button>
      </Tooltip>

      <Modal
        title={t("title_delete")}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={close}
        maskClosable={false}
        confirmLoading={deletePosition.isLoading}
        onOk={() => {
          deletePosition.mutate({
            list_json: [{ position_id: id }],
            lu_user_id: userProfile.user_id,
          });
          close();
        }}
      >
        Hành động này sẽ làm mất dữ liệu hiện tại. Tiếp tục?
      </Modal>
    </>
  );
}
