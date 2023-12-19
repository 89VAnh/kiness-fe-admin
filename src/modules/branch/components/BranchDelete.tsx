import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, message } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import { CACHE_BRANCH, useDeleteBranch } from "@/loader/branch.loader";
import { IBaseDelete } from "@/models/base";
import { deleteFile } from "@/services/upload.service";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id: number;
  thumbnail: string;
}

export default function BranchDelete({ id, thumbnail }: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);

  const deleteBranch = useDeleteBranch({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(data.message);
          queryClient.invalidateQueries([CACHE_BRANCH.SEARCH]);
          deleteFile({ filePath: thumbnail });
          close();
        } else message.error(data.message);
      },
      onError(error) {
        message.error(error.message);
      },
    },
  });

  const handleDelete = () => {
    const dataPost: IBaseDelete = {
      list_json: [{ branch_id: id }],
      lu_user_id: userProfile.user_id,
    };

    deleteBranch.mutate(dataPost);
  };

  return (
    <>
      <Tooltip title={t("all.delete")}>
        <Button type="dashed" danger onClick={open}>
          <DeleteOutlined />
        </Button>
      </Tooltip>

      <Modal
        title={t("branch.title_delete")}
        width={500}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={close}
        onOk={handleDelete}
        confirmLoading={deleteBranch.isLoading}
      >
        Hành động này sẽ làm mất dữ liệu hiện tại. Tiếp tục?
      </Modal>
    </>
  );
}
