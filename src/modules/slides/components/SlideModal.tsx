import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Tooltip,
  Upload,
  UploadProps,
  message,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import EditorBasic from "@/components/Editor/EditorBasic";
import { handleDeleteImage } from "@/components/Editor/utils/upload-editor";
import { queryClient } from "@/lib/react-query";
import {
  CACHE_SLIDES,
  useCreateSlide,
  useGetSlideById,
  useUpdateSlide,
} from "@/loader/slides.loader";
import { uploadFile } from "@/services/upload.service";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: string;
  isCreate?: boolean;
}

export default function SlideModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);
  const [dataEditor, setDataEditor] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [form] = Form.useForm();

  const updatePage = useUpdateSlide({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_SLIDES.SLIDES]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createPage = useCreateSlide({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.create_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_SLIDES.SLIDES]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  useGetSlideById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (!data?.message) {
          form.setFieldsValue(data);
          form.setFieldValue("image", [
            {
              name: "",
              uid: "1",
              thumbUrl: "/api/" + data.image,
            },
          ]);
          setDataEditor(data?.slide_caption || "");
        }
      },
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        let dataFile;
        if (file) dataFile = await uploadFile({ file });
        const dataPost = {
          ...values,
          image: dataFile
            ? dataFile.path
            : values.image?.[0]?.thumbUrl?.replace("/api/", ""),
          slide_caption: dataEditor,
        };
        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createPage.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updatePage.mutate(dataPost);
        }
      })
      .catch((err) => {
        console.log(err);
        message.warning(t("messages.validate_form"));
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setFile(null);
    setDataEditor("");
    close();
  };

  const uploadProps: UploadProps = {
    maxCount: 1,
    accept: "image/*",
    listType: "picture-card",
    beforeUpload(file) {
      setFile(file);
      return false;
    },
    onChange({ file }: any) {
      form.setFieldValue("image", [
        {
          name: "",
          uid: "1",
          thumbUrl: URL.createObjectURL(file),
        },
      ]);
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
        title={isCreate ? t("slide.title_create") : t("slide.title_update")}
        style={{ top: 58, padding: 0, minWidth: 1000 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={updatePage.isLoading || createPage.isLoading}
      >
        <div
          style={{
            height: "calc(100vh - 174px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={32}>
              <Form.Item name={"slide_id"} hidden>
                <Input />
              </Form.Item>
              <Col span={12}>
                <Form.Item
                  name={"image"}
                  label={t("slide.fields.image")}
                  rules={[...RULES_FORM.required]}
                  valuePropName="fileList"
                >
                  <Upload {...uploadProps}>
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={"order"}
                  label={t("slide.fields.order") + " (Giảm dần)"}
                  rules={[...RULES_FORM.required]}
                  initialValue={0}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder={t("slide.fields.order")}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"slide_caption"}
                  label={t("slide.fields.caption")}
                >
                  <CKEditor
                    editor={EditorBasic}
                    onReady={() => {
                      // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDataEditor(data);
                      handleDeleteImage(event);
                    }}
                    data={dataEditor || ""}
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
