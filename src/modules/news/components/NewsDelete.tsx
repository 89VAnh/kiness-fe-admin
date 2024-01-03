import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import { CACHE_NEWS, useDeleteNews } from "@/loader/news.loader";
import { deleteFile } from "@/services/upload.service";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: number;
  thumbnail: string;
}

export default function NewsDelete({ id, thumbnail }: Props): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "news" });
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);

  const deleteNews = useDeleteNews({
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
        queryClient.invalidateQueries([CACHE_NEWS.NEWS]);
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
        maskClosable={false}
        style={{ top: 58, padding: 0 }}
        confirmLoading={deleteNews.isLoading}
        onOk={() => {
          deleteNews.mutate({
            list_json: [{ news_id: id }],
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
