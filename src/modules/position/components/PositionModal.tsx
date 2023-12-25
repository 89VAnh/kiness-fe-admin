import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import {
  CACHE_POSITION,
  useCreatePosition,
  useGetPositionById,
  useUpdatePosition,
} from "@/loader/position.loader";
import { IPosition } from "@/models/position";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: number;
  isCreate?: boolean;
}

export default function PositionModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const [form] = Form.useForm();
  const userProfile = useRecoilValue(UserState);

  useGetPositionById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (!data?.message) {
          form.setFieldsValue(data);
        }
      },
    },
  });

  const updatePosition = useUpdatePosition({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_POSITION.POSITION]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createPosition = useCreatePosition({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.create_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_POSITION.POSITION]);
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
        const dataPost: IPosition = {
          position_id: values.position_id,
          position_name: values.position_name,
          description: values.description,
        };

        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createPosition.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updatePosition.mutate(dataPost);
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
        title={
          isCreate ? t("position.title_create") : t("position.title_update")
        }
        // width={"90vw"}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={updatePosition.isLoading || createPosition.isLoading}
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
              <Form.Item name="position_id" hidden>
                <Input />
              </Form.Item>
              <Col span={24}>
                <Form.Item
                  name={"position_name"}
                  rules={[...RULES_FORM.required]}
                  label={t("position.fields.position_name")}
                >
                  <Input placeholder={t("position.fields.position_name")} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"description"}
                  rules={[...RULES_FORM.required]}
                  label={t("position.fields.description")}
                >
                  <TextArea placeholder={t("position.fields.description")} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
