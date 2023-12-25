import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import EditorCustom from "@/components/Editor/Editor";
import {
  handleDeleteImage,
  uploadPlugin,
} from "@/components/Editor/utils/upload-editor";
import { BASE_URL } from "@/constant/config";
import { queryClient } from "@/lib/react-query";
import {
  CACHE_LICENSE_OF_INVENTION,
  useCreateLicenseOfInvention,
  useGetLicenseOfInventionById,
  useUpdateLicenseOfInvention,
} from "@/loader/license-of-invention.loader";
import { ILicenseOfInvention } from "@/models/license-of-invention";
import { uploadFile } from "@/services/upload.service";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: number;
  isCreate?: boolean;
}

export default function LicenseModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const [form] = Form.useForm();
  const userProfile = useRecoilValue(UserState);
  const [dataEditor, setDataEditor] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useGetLicenseOfInventionById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (data?.success) {
          form.setFieldsValue(data.data);

          setFileList([
            {
              name: "",
              uid: "1",
              thumbUrl: `${BASE_URL}/` + data?.data?.image_url,
            },
          ]);

          setDataEditor(data?.data.description || "");
        }
      },
    },
  });

  const updateLicenseOfInvention = useUpdateLicenseOfInvention({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_LICENSE_OF_INVENTION.SEARCH]);
          setDataEditor("");
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createLicenseOfInvention = useCreateLicenseOfInvention({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.create_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_LICENSE_OF_INVENTION.SEARCH]);
          setDataEditor("");
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        let dataFile;
        if (file) dataFile = await uploadFile({ file });

        const dataPost: ILicenseOfInvention = {
          ...values,
          description: dataEditor,
        };

        if (dataFile?.path) dataPost.image_url = dataFile.path;

        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createLicenseOfInvention.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateLicenseOfInvention.mutate(dataPost);
        }
      })
      .catch(() => message.warning(t("messages.validate_form")));
  };

  const handleCancel = () => {
    form.resetFields();
    setFile(null);
    setFileList([]);
    close();
  };

  const uploadProps: UploadProps = {
    maxCount: 1,
    accept: "image/*",
    listType: "picture-card",
    fileList,
    beforeUpload(file) {
      setFile(file);
      return false;
    },
    onChange({ fileList }: any) {
      setFileList(fileList);
    },
    onRemove() {
      form.setFieldValue("image", []);
      setFile(null);

      return false;
    },
  };

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
        title={
          isCreate
            ? t("license_of_invention.title_create")
            : t("license_of_invention.title_update")
        }
        width={"60vw"}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={
          updateLicenseOfInvention.isLoading ||
          createLicenseOfInvention.isLoading
        }
      >
        <div
          style={{
            height: "calc(100vh - 174px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Form form={form} spellCheck={false} layout="vertical">
            <Row gutter={32}>
              <Form.Item name="license_id" hidden>
                <Input />
              </Form.Item>
              <Col span={8}>
                <Form.Item
                  name={"image"}
                  label={t("license_of_invention.fields.image_url")}
                >
                  <Upload {...uploadProps}>
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name={"title"}
                  rules={[...RULES_FORM.required]}
                  label={t("license_of_invention.fields.title")}
                >
                  <Input placeholder={t("license_of_invention.fields.title")} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={"license_no"}
                  rules={[...RULES_FORM.required]}
                  label={t("license_of_invention.fields.license_no")}
                >
                  <Input
                    placeholder={t("license_of_invention.fields.license_no")}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name={"description"}
                  label={t("license_of_invention.fields.description")}
                >
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
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
