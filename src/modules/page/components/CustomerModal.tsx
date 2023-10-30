import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Modal, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import EditorCustom from "@/components/Editor/Editor";
import {
  handleDeleteImage,
  uploadPlugin,
} from "@/components/Editor/utils/upload-editor";
import { useDisclosure } from "@/utils/modal";

interface Props {
  id?: string;
  isCreate?: boolean;
}

export default function CustomerModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const [dataEditor, setDataEditor] = useState<string>(id + "");

  return (
    <>
      {isCreate ? (
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={open}
          type="primary"
        >
          {t("all.btn_add")}
        </Button>
      ) : (
        <Tooltip title={t("all.edit")}>
          <Button type="dashed" onClick={open} style={{ color: "#faad14" }}>
            <EditOutlined />
          </Button>
        </Tooltip>
      )}
      <Modal
        title={t("customer.title_create")}
        width={"90vw"}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={close}
        onOk={close}
      >
        <div style={{ height: "calc(100vh - 174px)", overflow: "auto" }}>
          <CKEditor
            config={{
              // @ts-ignore
              extraPlugins: [uploadPlugin],
            }}
            editor={EditorCustom}
            onReady={() => {
              // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDataEditor(data);
              handleDeleteImage(event);
            }}
            data={dataEditor}
          />
        </div>
      </Modal>
    </>
  );
}
