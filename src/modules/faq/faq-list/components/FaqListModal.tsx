import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tooltip,
  message,
} from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import { useFaqTopicDropdown } from "@/loader/faq-topic.loader";
import {
  CACHE_FAQ,
  useCreateFaq,
  useGetFaqById,
  useUpdateFaq,
} from "@/loader/faq.loader";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: string;
  isCreate?: boolean;
}

export default function FaqListModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);
  const [form] = Form.useForm();

  const {
    data: topicOptions,
    isLoading: isLoadingTopic,
    refetch: refetchTopic,
  } = useFaqTopicDropdown({});

  const updateFaq = useUpdateFaq({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_FAQ.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createFaq = useCreateFaq({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_FAQ.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  useGetFaqById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (data?.success) {
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
          createFaq.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateFaq.mutate(dataPost);
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

  const handleOpen = () => {
    open();
    refetchTopic();
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
          isCreate ? t("faq.list.title_create") : t("faq.list.title_update")
        }
        style={{ top: 58, padding: 0, minWidth: 1000 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        maskClosable={false}
        confirmLoading={updateFaq.isLoading || createFaq.isLoading}
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
              <Form.Item name={"faq_id"} hidden>
                <Input />
              </Form.Item>
              <Col span={24}>
                <Form.Item
                  name={"topic_id"}
                  label={t("faq.list.fields.topic_name")}
                  rules={[...RULES_FORM.required]}
                >
                  <Select
                    loading={isLoadingTopic}
                    placeholder="Chọn loại"
                    options={topicOptions?.data || []}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"question"}
                  label={t("faq.list.fields.question")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder={t("faq.list.fields.question")}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"answer"}
                  label={t("faq.list.fields.answer")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input.TextArea
                    placeholder={t("faq.list.fields.answer")}
                    rows={8}
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
