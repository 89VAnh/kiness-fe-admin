import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, message } from "antd";
import { useTranslation } from "react-i18next";

import { queryClient } from "@/lib/react-query";
import { CACHE_FAQ, useDeleteFaq } from "@/loader/faq.loader";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: string;
}

export default function FaqListModal({ id }: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();

  const deleteQuery = useDeleteFaq({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(data.message);
          queryClient.invalidateQueries([CACHE_FAQ.SEARCH]);
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
        title={t("faq.list.title_delete")}
        width={500}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={close}
        onOk={handleDelete}
        maskClosable={false}
        confirmLoading={deleteQuery.isLoading}
      >
        Hành động này sẽ làm mất dữ liệu hiện tại. Tiếp tục?
      </Modal>
    </>
  );
}
