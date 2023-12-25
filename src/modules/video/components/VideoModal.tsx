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

import { ERROR_TIMEOUT } from "@/constant/config";
import { queryClient } from "@/lib/react-query";
import {
  CACHE_VIDEO,
  useCreateVideo,
  useGetVideoById,
  useUpdateVideo,
} from "@/loader/video.loader";
import { IVideo } from "@/models/video";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: string;
  isCreate?: boolean;
}

export default function VideoModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const [form] = Form.useForm();
  const userProfile = useRecoilValue(UserState);

  const { remove, refetch } = useGetVideoById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (data.message === ERROR_TIMEOUT) {
          refetch();
          return;
        }
        if (!data?.message) {
          form.setFieldsValue(data.data);
        }
      },
    },
  });

  const updateVideo = useUpdateVideo({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_VIDEO.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createVideo = useCreateVideo({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.create_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_VIDEO.SEARCH]);
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
        const dataPost: IVideo = {
          ...values,
        };

        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createVideo.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateVideo.mutate(dataPost);
        }
      })
      .catch(() => message.warning(t("messages.validate_form")));
  };

  const handleCancel = () => {
    form.resetFields();
    remove();
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
        title={isCreate ? t("video.title_create") : t("video.title_update")}
        width={600}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={updateVideo.isLoading || createVideo.isLoading}
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
              <Form.Item name="video_id" hidden>
                <Input />
              </Form.Item>
              <Col span={12}>
                <Form.Item
                  name={"video_name"}
                  rules={[...RULES_FORM.required]}
                  label={t("video.fields.video_name")}
                >
                  <Input placeholder={t("video.fields.video_name")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={"video_link"}
                  rules={[...RULES_FORM.required]}
                  label={t("video.fields.video_link")}
                >
                  <Input placeholder={t("video.fields.video_link")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={"is_foreign"}
                  rules={[...RULES_FORM.required]}
                  label={t("video.fields.is_foreign")}
                  initialValue={0}
                >
                  <Select
                    placeholder={t("video.fields.is_foreign")}
                    options={[
                      {
                        label: t("video.fields.local"),
                        value: 0,
                      },
                      {
                        label: t("video.fields.world"),
                        value: 1,
                      },
                    ]}
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
