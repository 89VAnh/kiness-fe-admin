import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { deleteCustomer } from "@/services/customers.service";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: string;
}

export default function CustomerDelete({ id }: Props): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "customer" });
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);

  return (
    <>
      <Tooltip title={t("all.delete")}>
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
          deleteCustomer([{ customer_id: id }], userProfile.user_id);

          close();
        }}
      ></Modal>
    </>
  );
}
