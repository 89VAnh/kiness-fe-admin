import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import { CACHE_POSITION, useDeletePosition } from "@/loader/position.loader";
import { deleteFile } from "@/services/upload.service";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: number;
  thumbnail: string;
}

export default function PositionDelete({ id, thumbnail }: Props): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "position" });
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);

  const deletePosition = useDeletePosition({
    config: {
      onSuccess: (data: any[]) => {
        if (data.length > 0) {
          data.forEach((message) => {
            if (message.status) {
              notification.success({
                message: message.message + ": " + message.vat_invoice_id,
              });
            } else {
              notification.error({
                message: message.message,
              });
            }
          });
        }
        queryClient.invalidateQueries([CACHE_POSITION.POSITION]);
        deleteFile({ filePath: thumbnail });
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
        open={isOpen}
        onCancel={close}
        onOk={() => {
          deletePosition.mutate({
            list_json: [{ position_id: id }],
            updated_by_id: userProfile.user_id,
          });
          close();
        }}
      ></Modal>
    </>
  );
}
