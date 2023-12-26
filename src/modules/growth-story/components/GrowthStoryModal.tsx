import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
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
  CACHE_GROWTH_STORY,
  useCreateGrowthStory,
  useGetGrowthStoryById,
  useUpdateGrowthStory,
} from "@/loader/growth-story.loader";
import { IGrowthStory } from "@/models/growth-story";
import { uploadFile } from "@/services/upload.service";
import { UserState } from "@/store/auth/atom";
import { formatDatePost, formatDateShow } from "@/utils/format-string";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

import { draftOptions } from "../data/data-fake";

interface Props {
  id?: string;
  isCreate?: boolean;
}

export default function GrowthStoryModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);
  const [form] = Form.useForm();
  const [dataEditor, setDataEditor] = useState<string>("");
  const [postedDate, setPostedDate] = useState<Dayjs | null>(dayjs());
  const [file, setFile] = useState<File | null>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const createGrowthStory = useCreateGrowthStory({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_GROWTH_STORY.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const updateGrowthStory = useUpdateGrowthStory({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_GROWTH_STORY.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  useGetGrowthStoryById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (data?.success) {
          form.setFieldsValue(data?.data);
          const date = dayjs(data?.data?.posted_date);
          setPostedDate(date.isValid() ? date : null);
          setDataEditor(data?.data?.content);

          setFileList([
            {
              name: "image_link",
              uid: "1",
              thumbUrl: `${BASE_URL}/` + data?.data?.image_link,
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
        let dataFile;
        if (file) dataFile = await uploadFile({ file });

        const dataPost: IGrowthStory = {
          ...values,
          title: values.title?.trim(),
          content: dataEditor,
          posted_date: postedDate?.format(formatDatePost),
        };

        if (dataFile?.path) dataPost.image_link = dataFile.path;

        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createGrowthStory.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateGrowthStory.mutate(dataPost);
        }
      })
      .catch((err) => {
        console.log(err);
        message.warning(t("messages.validate_form"));
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setPostedDate(null);
    setFileList([]);
    setFile(null);
    close();
  };

  const handleOpen = () => {
    if (isCreate) setPostedDate(dayjs());
    open();
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
          onClick={handleOpen}
          type="primary"
        >
          {t("all.btn_add")}
        </Button>
      ) : (
        <Tooltip title={t("all.edit")}>
          <Button
            type="dashed"
            onClick={handleOpen}
            style={{ color: "#faad14" }}
          >
            <EditOutlined />
          </Button>
        </Tooltip>
      )}
      <Modal
        title={
          isCreate
            ? t("growth_story.title_create")
            : t("growth_story.title_update")
        }
        style={{ top: 58, padding: 0, minWidth: 1428.48 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        destroyOnClose
        confirmLoading={updateGrowthStory.isLoading}
        maskClosable={false}
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
              <Form.Item name={"growth_story_id"} hidden>
                <Input />
              </Form.Item>
              <Col span={19}>
                <Row gutter={32}>
                  <Col span={18}>
                    <Form.Item
                      name={"title"}
                      label={t("growth_story.fields.title")}
                      rules={[...RULES_FORM.required]}
                    >
                      <Input placeholder={t("growth_story.fields.title")} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name={"is_draft"}
                      label={t("growth_story.fields.is_draft.title")}
                      rules={[...RULES_FORM.required]}
                      initialValue={1}
                    >
                      <Select
                        options={draftOptions?.filter((x) => x.value !== "")}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={"author_name"}
                      label={t("growth_story.fields.author_name")}
                      rules={[...RULES_FORM.required]}
                      initialValue={userProfile.full_name}
                    >
                      <Input autoCapitalize="" />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      label={t("growth_story.fields.posted_date")}
                      rules={[...RULES_FORM.required]}
                    >
                      <DatePicker
                        inputReadOnly
                        format={formatDateShow}
                        value={postedDate}
                        className="w-full"
                        onChange={(value) => setPostedDate(value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name={"view_count"}
                      label={t("growth_story.fields.view_count")}
                      rules={[...RULES_FORM.required]}
                      initialValue={0}
                    >
                      <InputNumber min={0} className="w-full" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col span={5}>
                <Form.Item
                  name={"image_link"}
                  label={t("growth_story.fields.image_link")}
                  rules={[...RULES_FORM.required]}
                >
                  <Upload {...uploadProps}>
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name={"content"}
                  label={t("growth_story.fields.content")}
                  rules={[...RULES_FORM.required]}
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
