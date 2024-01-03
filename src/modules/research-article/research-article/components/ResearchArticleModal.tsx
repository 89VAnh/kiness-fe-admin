import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tooltip,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import EditorCustom from "@/components/Editor/Editor";
import {
  handleDeleteImage,
  uploadPlugin,
} from "@/components/Editor/utils/upload-editor";
import { queryClient } from "@/lib/react-query";
import { useArticleAuthorDropdown } from "@/loader/article-author.loader";
import {
  CACHE_RESEARCH_ARTICLE,
  useCreateResearchArticle,
  useGetResearchArticleById,
  useUpdateResearchArticle,
} from "@/loader/research-article.loader";
import { IResearchArticle } from "@/models/research-article";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: number;
  isCreate?: boolean;
}

export default function ResearchArticleModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const [form] = Form.useForm();
  const userProfile = useRecoilValue(UserState);
  const [dataEditor, setDataEditor] = useState<string>("");

  const { data: authors, isLoading, refetch } = useArticleAuthorDropdown({});

  useGetResearchArticleById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (!data?.message) {
          form.setFieldsValue({
            ...data,
            year_of_release: dayjs(data.year_of_release + "-01-01"),
            authors: data.list_json_author.map((x: any) => x.author_id),
          });

          setDataEditor(data?.content || "");
        }
      },
    },
  });

  const updateResearchArticle = useUpdateResearchArticle({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_RESEARCH_ARTICLE.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createResearchArticle = useCreateResearchArticle({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.create_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_RESEARCH_ARTICLE.SEARCH]);
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
        const dataPost: IResearchArticle = {
          ...values,
          year_of_release: values.year_of_release.year(),
          content: dataEditor,
          list_json_author_id: JSON.stringify(
            values.authors.map((x: number) => ({ author_id: x })),
          ),
        };

        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createResearchArticle.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateResearchArticle.mutate(dataPost);
        }
      })
      .catch(() => message.warning(t("messages.validate_form")));
  };

  const handleOpen = () => {
    open();
    refetch();
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
            ? t("research_article.title_create")
            : t("research_article.title_update")
        }
        width="74.67vw"
        style={{
          top: 58,
          padding: 0,
        }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        maskClosable={false}
        confirmLoading={
          updateResearchArticle.isLoading || createResearchArticle.isLoading
        }
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
              <Form.Item name="article_id" hidden>
                <Input />
              </Form.Item>
              <Col span={24}>
                <Form.Item
                  name={"title"}
                  rules={[...RULES_FORM.required]}
                  label={t("research_article.fields.title")}
                >
                  <Input.TextArea
                    placeholder={t("research_article.fields.title")}
                  />
                </Form.Item>
              </Col>

              <Col span={10}>
                <Form.Item
                  name={"authors"}
                  rules={[...RULES_FORM.required]}
                  label={t("research_article.fields.authors")}
                >
                  <Select
                    loading={isLoading}
                    mode="multiple"
                    options={authors ? authors.data : []}
                    placeholder={t("research_article.fields.authors")}
                  />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item
                  name={"year_of_release"}
                  rules={[...RULES_FORM.required]}
                  label={t("research_article.fields.year_of_release")}
                >
                  <DatePicker
                    inputReadOnly
                    placeholder={t("research_article.fields.year_of_release")}
                    picker="year"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name={"issuers"}
                  rules={[...RULES_FORM.required]}
                  label={t("research_article.fields.issuers")}
                >
                  <Input placeholder={t("research_article.fields.issuers")} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"article_link"}
                  rules={[...RULES_FORM.required]}
                  label={t("research_article.fields.article_link")}
                >
                  <TextArea
                    placeholder={t("research_article.fields.article_link")}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"content"}
                  label={t("research_article.fields.content")}
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
