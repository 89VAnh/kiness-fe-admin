import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, message } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import {
  CACHE_ARTICLE_AUTHOR,
  useDeleteArticleAuthor,
} from "@/loader/article-author.loader";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: number;
}

export default function ArticleAuthorDelete({ id }: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);

  const deleteQuery = useDeleteArticleAuthor({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(data.message);
          queryClient.invalidateQueries([CACHE_ARTICLE_AUTHOR.SEARCH]);
          close();
        } else message.error(data.message);
      },
      onError(error) {
        message.error(error.message);
      },
    },
  });

  const handleDelete = () => {
    deleteQuery.mutate({
      list_json: [{ author_id: id }],
      updated_by_id: userProfile.user_id,
    });
  };

  return (
    <>
      <Tooltip title={t("all.delete")}>
        <Button type="dashed" danger onClick={open}>
          <DeleteOutlined />
        </Button>
      </Tooltip>

      <Modal
        title={t("faq.topic.title_delete")}
        width={500}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={close}
        onOk={handleDelete}
        confirmLoading={deleteQuery.isLoading}
      >
        Hành động này sẽ làm mất dữ liệu hiện tại. Tiếp tục?
      </Modal>
    </>
  );
}
