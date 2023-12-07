import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import {
  CACHE_RESEARCHER,
  useDeleteResearcher,
} from "@/loader/researcher.loader";
import { deleteFile } from "@/services/upload.service";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: number;
  image_url: string;
}

export default function ResearcherDelete({
  id,
  image_url,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "researcher" });
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);

  const deleteResearcher = useDeleteResearcher({
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

        deleteFile({ filePath: image_url });
        queryClient.invalidateQueries([CACHE_RESEARCHER.RESEARCHER]);
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
          deleteResearcher.mutate({
            list_json: [{ researcher_id: id }],
            updated_by_id: userProfile.user_id,
          });
          close();
        }}
      ></Modal>
    </>
  );
}
