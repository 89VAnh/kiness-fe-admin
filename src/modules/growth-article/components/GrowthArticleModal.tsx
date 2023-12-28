import { EditOutlined, PlusOutlined } from "@ant-design/icons";
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
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import {
  CACHE_GROWTH_ARTICLE,
  useCreateGrowthArticle,
  useGetGrowthArticleById,
  useUpdateGrowthArticle,
} from "@/loader/growth-article.loader";
import { UserState } from "@/store/auth/atom";
import { formatDatePost, formatDateShow } from "@/utils/format-string";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

import { draftOptions } from "../data/data-fake";

interface Props {
  id?: string;
  isCreate?: boolean;
}

export default function GrowthArticleModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);
  const [postedDate, setPostedDate] = useState<Dayjs | null>(dayjs());
  const [form] = Form.useForm();

  const createGrowthArticle = useCreateGrowthArticle({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_GROWTH_ARTICLE.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const updateGrowthArticle = useUpdateGrowthArticle({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_GROWTH_ARTICLE.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  useGetGrowthArticleById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (data?.success) {
          form.setFieldsValue(data?.data);
          const date = dayjs(data?.data?.posted_date);
          setPostedDate(date.isValid() ? date : null);
        }
      },
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const dataPost = {
          ...values,
          posted_date: postedDate?.format(formatDatePost),
        };
        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createGrowthArticle.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateGrowthArticle.mutate(dataPost);
        }
      })
      .catch(() => {
        message.warning(t("messages.validate_form"));
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setPostedDate(null);
    close();
  };

  const handleOpen = () => {
    if (isCreate) setPostedDate(dayjs());
    open();
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
            ? t("growth_article.title_create")
            : t("growth_article.title_update")
        }
        style={{ top: 58, padding: 0, minWidth: 1000 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={updateGrowthArticle.isLoading}
        maskClosable={false}
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
              <Form.Item name={"growth_article_id"} hidden>
                <Input />
              </Form.Item>

              <Col span={12}>
                <Form.Item
                  name={"author_name"}
                  label={t("growth_article.fields.author_name")}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  // name={"date"}
                  label={t("growth_article.fields.posted_date")}
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
                  name={"is_draft"}
                  label={t("growth_article.fields.is_draft.title")}
                  initialValue={1}
                >
                  <Select
                    options={draftOptions?.filter((x) => x.value !== "")}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"title"}
                  label={t("growth_article.fields.title")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name={"content"}
                  label={t("growth_article.fields.content")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input.TextArea
                    rows={8}
                    placeholder={t("growth_article.fields.content")}
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
