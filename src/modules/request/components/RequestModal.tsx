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
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import {
  CACHE_REQUEST,
  useGetRequestById,
  useUpdateRequest,
} from "@/loader/request.loader";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

import { acceptOptions, answerOptions } from "../data/data-fake";

interface Props {
  id?: string;
  isCreate?: boolean;
}

export default function RequestModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);
  const [form] = Form.useForm();
  const answer = Form.useWatch("answer", form);

  useEffect(() => {
    if (answer?.trim()) form.setFieldValue("is_answered", 1);
    else form.setFieldValue("is_answered", 0);
  }, [answer, form]);

  const updateRequest = useUpdateRequest({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_REQUEST.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  useGetRequestById({
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
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateRequest.mutate(dataPost);
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
        title={isCreate ? t("request.title_create") : t("request.title_update")}
        style={{ top: 58, padding: 0, minWidth: 1000 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={updateRequest.isLoading}
        maskClosable={false}
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
              <Form.Item name={"request_id"} hidden>
                <Input />
              </Form.Item>
              <Col span={6}>
                <Form.Item
                  name={"subject"}
                  label={t("request.fields.subject")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={"is_accepted"}
                  label={t("request.fields.is_accepted.title")}
                  rules={[...RULES_FORM.required]}
                >
                  <Select options={acceptOptions} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={"is_answered"}
                  label={t("request.fields.is_answered.title")}
                >
                  <Select disabled defaultValue={""} options={answerOptions} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={"password"}
                  label={t("request.fields.password")}
                >
                  <Input disabled />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name={"email"} label={t("request.fields.email")}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={"phone_number"}
                  label={t("request.fields.phone_number")}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={"author_name"}
                  label={t("request.fields.author_name")}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={"answered_by"}
                  label={"Người cập nhật cuối cùng"}
                >
                  <Input disabled />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name={"content"}
                  label={t("request.fields.content")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input.TextArea
                    disabled
                    placeholder={t("request.fields.content")}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name={"answer"} label={t("request.fields.answer")}>
                  <Input.TextArea
                    placeholder={t("request.fields.answer")}
                    rows={4}
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
