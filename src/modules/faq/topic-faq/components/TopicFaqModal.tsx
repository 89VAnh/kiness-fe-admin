import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip, message } from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import {
  CACHE_FAQ_TOPIC,
  useCreateFaqTopic,
  useGetFaqTopicById,
  useUpdateFaqTopic,
} from "@/loader/faq-topic.loader";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: string;
  isCreate?: boolean;
}

export default function TopicFaqModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);
  const [form] = Form.useForm();

  const updatePage = useUpdateFaqTopic({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_FAQ_TOPIC.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createPage = useCreateFaqTopic({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_FAQ_TOPIC.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  useGetFaqTopicById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (!data?.message) {
          form.setFieldsValue(data?.data);
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
        title={
          isCreate ? t("faq.topic.title_create") : t("faq.topic.title_update")
        }
        style={{ top: 58, padding: 0, minWidth: 400 }}
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
          <Form form={form} spellCheck={false} layout="vertical">
            <Row gutter={32}>
              <Form.Item name={"topic_id"} hidden>
                <Input />
              </Form.Item>
              <Col span={24}>
                <Form.Item
                  name={"topic_name"}
                  label={t("faq.topic.fields.topic_name")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input placeholder={t("faq.topic.fields.topic_name")} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
