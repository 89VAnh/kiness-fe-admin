import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

import {
  CACHE_EXPERIENCE_REGISTER,
  useDeleteExperienceRegister,
} from "@/loader/experienceRegister.loader";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: number;
}

export default function ExperienceRegisterDelete({ id }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "experience_register",
  });
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);
  const queryClient = useQueryClient();

  const deleteExperienceRegister = useDeleteExperienceRegister({
    config: {
      onSuccess: (data: any) => {
        console.log(data.results);

        if (data.results) {
          notification.success({
            message: data.message,
          });
        } else {
          notification.error({
            message: data.message,
          });
        }

        queryClient.invalidateQueries([
          CACHE_EXPERIENCE_REGISTER.EXPERIENCE_REGISTER,
        ]);
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
        <Button
          type="dashed"
          danger
          onClick={() => {
            open();
          }}
        >
          <DeleteOutlined />
        </Button>
      </Tooltip>

      <Modal
        title={t("title_delete")}
        open={isOpen}
        onCancel={close}
        onOk={() => {
          deleteExperienceRegister.mutate({
            list_json: [{ register_id: id }],
            updated_by_id: userProfile.user_id,
          });
          close();
        }}
      ></Modal>
    </>
  );
}
