import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Tooltip,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import {
  CACHE_HISTORY,
  useCreateHistory,
  useGetHistoryDetail,
  useUpdateHistory,
} from "@/loader/history.loader";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: number;
  isCreate?: boolean;
}

export default function HistoryModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);
  const [form] = Form.useForm();

  const updateHistory = useUpdateHistory({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_HISTORY.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createHistory = useCreateHistory({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.create_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_HISTORY.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  useGetHistoryDetail({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (data?.success) {
          const dataForm = data?.data;
          dataForm.year = dayjs(`${dataForm.year}-01-01`);
          form.setFieldsValue(dataForm);
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
          year: dayjs(values.year).year(),
        };

        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createHistory.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateHistory.mutate(dataPost);
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
        title={isCreate ? t("history.title_create") : t("history.title_update")}
        style={{ top: 58, padding: 0, minWidth: 600 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={updateHistory.isLoading}
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
              <Form.Item name={"history_id"} hidden>
                <Input />
              </Form.Item>
              <Col span={12}>
                <Form.Item
                  name={"year"}
                  label={t("history.fields.year")}
                  rules={[...RULES_FORM.required]}
                >
                  <DatePicker
                    inputReadOnly
                    picker="year"
                    defaultValue={dayjs()}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={"sort_order"}
                  label={t("history.fields.sort_order")}
                  rules={[...RULES_FORM.required]}
                >
                  <InputNumber min={1} max={100} defaultValue={1} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"content"}
                  label={t("history.fields.content")}
                  rules={[...RULES_FORM.required]}
                >
                  <TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
