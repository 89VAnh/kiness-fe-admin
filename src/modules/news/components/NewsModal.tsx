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
import { queryClient } from "@/lib/react-query";
import {
  CACHE_NEWS,
  useCreateNews,
  useGetNewsById,
  useUpdateNews,
} from "@/loader/news.loader";
import { INews } from "@/models/news";
import { uploadFile } from "@/services/upload.service";
import { UserState } from "@/store/auth/atom";
import { handleHtmlToString } from "@/utils/format-string";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: number;
  isCreate?: boolean;
}

export default function NewsModal({ id, isCreate = true }: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const [form] = Form.useForm();
  const userProfile = useRecoilValue(UserState);
  const [dataEditor, setDataEditor] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useGetNewsById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (!data?.message) {
          form.setFieldsValue(data);

          setFileList([
            {
              name: "",
              uid: "1",
              thumbUrl: "/api/" + data.thumbnail,
            },
          ]);

          setDataEditor(data?.content_html);
        }
      },
    },
  });

  const updateNews = useUpdateNews({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_NEWS.NEWS]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createNews = useCreateNews({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.create_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_NEWS.NEWS]);
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

        const dataPost: INews = {
          news_id: values.news_id,
          news_title: values.news_title,
          content_html: dataEditor,
          thumbnail: dataFile
            ? dataFile.path
            : fileList?.[0]?.thumbUrl?.replace("/api/", ""),
          content: handleHtmlToString(values.content_html),
          views: values.views,
        };

        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createNews.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateNews.mutate(dataPost);
        }
      })
      .catch(() => message.warning(t("messages.validate_form")));
  };

  const handleCancel = () => {
    form.resetFields();
    setFile(null);
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
        title={t("news.title_create")}
        width={"90vw"}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={updateNews.isLoading || createNews.isLoading}
      >
        <div
          style={{
            height: "calc(100vh - 174px)",
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
              <Form.Item name="news_id" hidden>
                <Input />
              </Form.Item>
              <Form.Item name="views" hidden>
                <Input />
              </Form.Item>
              <Form.Item name="content" hidden>
                <Input />
              </Form.Item>
              <Col span={14}>
                <Form.Item
                  name={"news_title"}
                  rules={[...RULES_FORM.required]}
                  label={t("news.fields.title")}
                >
                  <Input placeholder={t("news.fields.title")} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name={"news_thumbnail"}
                  label={t("news.fields.thumbnail")}
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
                  name={"content_html"}
                  label={t("news.fields.content_html")}
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
