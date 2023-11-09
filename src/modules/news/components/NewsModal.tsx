import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Tooltip,
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
import { UserState } from "@/store/auth/atom";
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
  const [thumbnail, setThumbnail] = useState();

  useGetNewsById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (!data?.message) {
          form.setFieldsValue(data);
          setDataEditor(data?.content);
          setThumbnail(data.thumbnail);
        }
      },
    },
  });

  const updateNews = useUpdateNews({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          close();
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
          message.success(t("messages.update_success"));
          close();
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
      .then((values) => {
        const dataPost = {
          ...values,
          content: dataEditor,
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
    close();
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
          <Form form={form} layout="vertical">
            <Row gutter={32}>
              <Form.Item name={"news_id"} hidden>
                <Input />
              </Form.Item>
              <Col span={12}>
                <Form.Item
                  name={"news_title"}
                  rules={[...RULES_FORM.required]}
                  label={t("news.fields.title")}
                >
                  <Input placeholder={t("news.fields.title")} />
                </Form.Item>
              </Col>
              <Col span={20}>
                <Form.Item
                  name={"content"}
                  rules={[...RULES_FORM.required]}
                  label={t("news.fields.content")}
                >
                  <Input.TextArea placeholder={t("news.fields.content")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={"news_thumbnail"}
                  label={t("news.fields.thumbnail")}
                >
                  {/* <UploadImageCommand /> */}
                  <Image src={thumbnail} />
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
