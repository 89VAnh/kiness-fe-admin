import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, message } from "antd";
import { useTranslation } from "react-i18next";

import { queryClient } from "@/lib/react-query";
import { CACHE_VIDEO, useDeleteVideo } from "@/loader/video.loader";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: string;
}

export default function VideoDelete({ id }: Props): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "video" });
  const { open, close, isOpen } = useDisclosure();

  const deleteVideo = useDeleteVideo({
    config: {
      onSuccess: (data: any) => {
        if (data.success) {
          message.success(data.message);
          queryClient.invalidateQueries([CACHE_VIDEO.SEARCH]);
          close();
        } else {
          message.error(data.message);
        }
      },
      onError: () => {
        message.error(t("message.delete_failure"));
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
          deleteVideo.mutate(id);
        }}
      >
        Hành động này sẽ làm mất dữ liệu hiện tại. Tiếp tục?
      </Modal>
    </>
  );
}
