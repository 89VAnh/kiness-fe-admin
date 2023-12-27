import { EditOutlined, PlusOutlined } from "@ant-design/icons";
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
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { BASE_URL } from "@/constant/config";
import { queryClient } from "@/lib/react-query";
import {
  CACHE_SLIDES,
  useCreateSlide,
  useGetSlideById,
  useUpdateSlide,
} from "@/loader/slide.loader";
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
  const [fileDesktop, setFileDesktop] = useState<File | null>();
  const [fileMobile, setFileMobile] = useState<File | null>();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const updatePage = useUpdateSlide({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_SLIDES.SEARCH]);
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
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_SLIDES.SEARCH]);
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
          setFileList([
            {
              name: "image_big",
              uid: "abc",
              thumbUrl: `${BASE_URL}/` + data?.image_big,
            },
            {
              name: "image_small",
              uid: "dgh",
              thumbUrl: `${BASE_URL}/` + data?.image_small,
            },
          ]);
        }
      },
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        let dataFileDesktop;
        let dataFileMobile;
        if (fileDesktop)
          dataFileDesktop = await uploadFile({ file: fileDesktop });
        if (fileMobile) dataFileMobile = await uploadFile({ file: fileMobile });
        const dataPost = {
          ...values,
        };

        if (dataFileDesktop?.path) dataPost.image_big = dataFileDesktop.path;
        if (dataFileMobile?.path) dataPost.image_small = dataFileMobile.path;

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
    setFileDesktop(null);
    setFileMobile(null);
    setFileList([]);
    close();
  };

  const uploadProps1: UploadProps = {
    maxCount: 1,
    accept: "image/*",
    listType: "picture-card",
    fileList: fileList?.[0] ? [fileList[0]] : undefined,
    beforeUpload(file) {
      setFileDesktop(file);
      return false;
    },
    onChange({ fileList }: any) {
      setFileList((prev) => {
        const list = prev.slice(1, 2);
        return [...fileList, ...list];
      });
    },
    onRemove() {
      form.setFieldValue("image_big", []);
      setFileDesktop(null);

      return false;
    },
  };

  const uploadProps2: UploadProps = {
    maxCount: 1,
    accept: "image/*",
    listType: "picture-card",
    fileList: fileList?.[1] ? [fileList[1]] : undefined,
    beforeUpload(file) {
      setFileMobile(file);
      return false;
    },
    onChange({ fileList }: any) {
      setFileList((prev) => {
        const list = prev.slice(0, 1);
        return [...list, ...fileList];
      });
    },
    onRemove() {
      form.setFieldValue("image_small", []);
      setFileMobile(null);

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
        style={{ top: 58, padding: 0, minWidth: 600 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={updatePage.isLoading || createPage.isLoading}
      >
        <div
          style={{
            // height: "calc(100vh - 174px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Form
            form={form}
            spellCheck={false}
            layout="vertical"
            style={{ marginRight: 5 }}
          >
            <Row gutter={32}>
              <Form.Item name={"slide_id"} hidden>
                <Input />
              </Form.Item>
              <Col span={12}>
                <Form.Item
                  name={"image_big"}
                  label={t("slide.fields.image_big") + " (1920 × 720)"}
                  rules={[...RULES_FORM.required]}
                >
                  <Upload {...uploadProps1}>
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={"image_small"}
                  label={t("slide.fields.image_small") + " (990 × 1487)"}
                  rules={[...RULES_FORM.required]}
                >
                  <Upload {...uploadProps2}>
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
              <Col span={12}>
                <Form.Item
                  name={"slide_caption"}
                  label={t("slide.fields.caption")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input placeholder={t("slide.fields.order")} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
