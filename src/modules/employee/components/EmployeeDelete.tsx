import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

import { CACHE_EMPLOYEES, useDeleteEmployee } from "@/loader/employees.loader";
import { IBaseDelete } from "@/models/base";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: string;
}

export default function EmployeeDelete({ id }: Props): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "employee" });
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);
  const queryClient = useQueryClient();

  const deleteEmployee = useDeleteEmployee({
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

        queryClient.invalidateQueries([CACHE_EMPLOYEES.EMPLOYEES]);
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

  const handleDelete = () => {
    const dataPost: IBaseDelete = {
      list_json: [{ employee_id: id }],
      updated_by_id: userProfile.user_id,
    };

    deleteEmployee.mutate(dataPost);
  };

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
        onOk={handleDelete}
      >
        Hành động này sẽ làm mất dữ liệu hiện tại. Tiếp tục?
      </Modal>
    </>
  );
}
