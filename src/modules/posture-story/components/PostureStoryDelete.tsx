import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, message } from "antd";
import { useTranslation } from "react-i18next";

import { queryClient } from "@/lib/react-query";
import {
  CACHE_POSTURE_STORY,
  useDeletePostureStory,
} from "@/loader/posture-story.loader";
import { deleteFile } from "@/services/upload.service";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: string;
  image_path: string;
}

export default function PostureStoryDelete({
  id,
  image_path,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();

  const deleteQuery = useDeletePostureStory({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(data.message);
          queryClient.invalidateQueries([CACHE_POSTURE_STORY.SEARCH]);
          deleteFile({ filePath: image_path });
          close();
        } else message.error(data.message);
      },
      onError(error) {
        message.error(error.message);
      },
    },
  });

  const handleDelete = () => {
    deleteQuery.mutate(id);
  };

  return (
    <>
      <Tooltip title={t("all.delete")}>
        <Button type="dashed" danger onClick={open}>
          <DeleteOutlined />
        </Button>
      </Tooltip>

      <Modal
        title={t("posture_story.title_delete")}
        width={500}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        maskClosable={false}
        onCancel={close}
        onOk={handleDelete}
        confirmLoading={deleteQuery.isLoading}
      >
        Hành động này sẽ làm mất dữ liệu hiện tại. Tiếp tục?
      </Modal>
    </>
  );
}
