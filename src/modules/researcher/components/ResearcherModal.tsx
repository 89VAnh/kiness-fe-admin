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
import { Select } from "antd/lib";
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
import { usePositionDropdown } from "@/loader/position.loader";
import {
  CACHE_RESEARCHER,
  useCreateResearcher,
  useGetResearcherById,
  useUpdateResearcher,
} from "@/loader/researcher.loader";
import { IResearcher } from "@/models/researcher";
import { uploadFile } from "@/services/upload.service";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: number;
  isCreate?: boolean;
}

export default function ResearcherModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const [form] = Form.useForm();
  const userProfile = useRecoilValue(UserState);
  const [storyDataEditor, setStoryDataEditor] = useState<string>("");
  const [paperDataEditor, setPaperDataEditor] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useGetResearcherById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (!data?.message) {
          form.setFieldsValue(data);

          setFileList([
            {
              name: "image_url",
              uid: "1",
              thumbUrl: `${BASE_URL}/` + data?.image_url,
            },
          ]);

          setStoryDataEditor(data?.story || "");
          setPaperDataEditor(data?.paper || "");
        }
      },
    },
  });

  const updateResearcher = useUpdateResearcher({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_RESEARCHER.RESEARCHER]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createResearcher = useCreateResearcher({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.create_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_RESEARCHER.RESEARCHER]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const positions = usePositionDropdown({});

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        let dataFile;
        if (file) dataFile = await uploadFile({ file });

        const dataPost: IResearcher = {
          ...values,
          story: storyDataEditor,
          paper: paperDataEditor,
        };

        if (dataFile?.path) dataPost.image_url = dataFile.path;

        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createResearcher.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateResearcher.mutate(dataPost);
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
          isCreate ? t("researcher.title_create") : t("researcher.title_update")
        }
        style={{ top: 58, padding: 0, minWidth: 1200 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={
          updateResearcher.isLoading || createResearcher.isLoading
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
              <Form.Item name="researcher_id" hidden>
                <Input />
              </Form.Item>

              <Col span={18}>
                <Row gutter={32}>
                  <Col span={16}>
                    <Form.Item
                      name={"name"}
                      rules={[...RULES_FORM.required]}
                      label={t("researcher.fields.name")}
                    >
                      <Input placeholder={t("researcher.fields.name")} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name={"position_id"}
                      rules={[...RULES_FORM.required]}
                      label={t("researcher.fields.position")}
                    >
                      <Select
                        style={{ width: "100%" }}
                        options={positions.data || []}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name={"degree"}
                      rules={[...RULES_FORM.required]}
                      label={t("researcher.fields.degree")}
                    >
                      <Input placeholder={t("researcher.fields.degree")} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col span={6}>
                <Form.Item
                  name={"image_url"}
                  label={t("researcher.fields.image_url")}
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
                <Form.Item name={"story"} label={t("researcher.fields.story")}>
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
                      setStoryDataEditor(data);
                      handleDeleteImage(event);
                    }}
                    data={storyDataEditor}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name={"paper"} label={t("researcher.fields.paper")}>
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
                      setPaperDataEditor(data);
                      handleDeleteImage(event);
                    }}
                    data={paperDataEditor}
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
