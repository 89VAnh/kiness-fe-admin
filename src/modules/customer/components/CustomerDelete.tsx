import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

import { CACHE_CUSTOMERS, useDeleteCustomer } from "@/loader/customers.loader";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: string;
}

export default function CustomerDelete({ id }: Props): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "customer" });
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);
  const queryClient = useQueryClient();

  const deleteCustomer = useDeleteCustomer({
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

        queryClient.invalidateQueries([CACHE_CUSTOMERS.CUSTOMERS]);
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
          deleteCustomer.mutate({
            list_json: [{ customer_id: id }],
            updated_by_id: userProfile.user_id,
          });
          close();
        }}
      ></Modal>
    </>
  );
}
