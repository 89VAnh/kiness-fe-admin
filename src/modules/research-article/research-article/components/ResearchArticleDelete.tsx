import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import {
  CACHE_RESEARCH_ARTICLE,
  useDeleteResearchArticle,
} from "@/loader/research-article.loader";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: number;
}

export default function ResearchArticleDelete({ id }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "research_article",
  });
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);

  const deleteResearchArticle = useDeleteResearchArticle({
    config: {
      onSuccess: (data: any) => {
        if (data.results) {
          notification.success({
            message: data.message,
          });
        } else {
          notification.error({
            message: data.message,
          });
        }

        queryClient.invalidateQueries([CACHE_RESEARCH_ARTICLE.SEARCH]);
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
        onOk={() => {
          deleteResearchArticle.mutate({
            list_json: [{ article_id: id }],
            lu_user_id: userProfile.user_id,
          });
          close();
        }}
        confirmLoading={deleteResearchArticle.isLoading}
      >
        Hành động này sẽ làm mất dữ liệu hiện tại. Tiếp tục?
      </Modal>
    </>
  );
}
