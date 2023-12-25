import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Tooltip,
  notification,
} from "antd";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { ERROR_TIMEOUT } from "@/constant/config";
import { queryClient } from "@/lib/react-query";
import {
  CACHE_ACTION,
  useCreateAction,
  useGetActionById,
  useUpdateAction,
} from "@/loader/action.loader";
import { getFunctionIdSelector } from "@/modules/authorization/store/state";
import { RULES_FORM } from "@/modules/authorization/utils/validator";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

import styles from "../../../../scss/styles.module.scss";

interface Props {
  isCreate: boolean;
  id?: string;
}

export function ActionModal({ isCreate, id }: Props): JSX.Element {
  const [form] = Form.useForm();
  const { isOpen, close, open } = useDisclosure();
  const function_id = useRecoilValue(getFunctionIdSelector);
  const userRecoil = useRecoilValue(UserState);
  const { t } = useTranslation();

  const { remove: removeAction, refetch } = useGetActionById({
    id: id!,
    config: {
      enabled: isOpen && !!id,
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          refetch();
        } else {
          form.setFieldsValue(data);
        }
      },
    },
  });

  const createAction = useCreateAction({
    config: {
      onSuccess: () => {
        notification.success({
          message: t("messages.create_success"),
        });
        close();
        queryClient.invalidateQueries([CACHE_ACTION.SEARCH]);
        form.resetFields();
      },
      onError: () => {
        notification.error({
          message: t("messages.create_failure"),
        });
      },
    },
  });

  const updateAction = useUpdateAction({
    config: {
      onSuccess: () => {
        notification.success({
          message: t("messages.update_success"),
        });
        close();
        queryClient.invalidateQueries([CACHE_ACTION.SEARCH]);
        form.resetFields();
      },
      onError: () => {
        notification.error({
          message: t("messages.update_failure"),
        });
      },
    },
  });

  const handleOpen = () => {
    open();
  };

  const handleCancel = () => {
    close();
    removeAction();
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const dataPost = {
          ...values,
          function_id,
          lu_user_id: userRecoil.user_id,
          created_by_user_id: userRecoil.user_id,
        };
        isCreate
          ? createAction.mutate(dataPost)
          : updateAction.mutate(dataPost);
      })
      .catch(() => {
        notification.warning({
          message: "Cần điền đầy đủ thông tin",
        });
      });
  };

  return (
    <>
      {isCreate ? (
        <Button
          type="primary"
          className={`${styles.button} ${styles.btn_add}`}
          onClick={handleOpen}
          disabled={!function_id}
        >
          {t("all.btn_add")}
        </Button>
      ) : (
        <Tooltip title={t("authorization.tooltip.btn_update")}>
          <Button
            type="default"
            size="small"
            onClick={handleOpen}
            className={styles.center}
          >
            <EditOutlined
              style={{
                color: "#faad14",
                cursor: "pointer",
              }}
            />
          </Button>
        </Tooltip>
      )}
      <Modal
        style={{ top: 110 }}
        open={isOpen}
        width={"40%"}
        title={
          isCreate
            ? t("authorization.actions.modal.title_create")
            : t("authorization.actions.modal.title_update")
        }
        okText={t("all.btn_save")}
        cancelText={t("all.btn_cancel")}
        onOk={handleOk}
        maskClosable={false}
        destroyOnClose
        onCancel={handleCancel}
        confirmLoading={
          isCreate ? createAction.isLoading : updateAction.isLoading
        }
      >
        <div className="modal-body">
          <Form form={form} layout="vertical">
            <Row gutter={32}>
              <Col span={12}>
                <Form.Item
                  label={t("authorization.actions.table.action_code")}
                  name={"action_code"}
                  rules={[...RULES_FORM.required]}
                >
                  <Input
                    placeholder={
                      t("authorization.actions.table.action_code") || ""
                    }
                    disabled={!isCreate}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="action_name"
                  label={t("authorization.actions.table.action_name")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input
                    placeholder={
                      t("authorization.actions.table.action_name") || ""
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label={t("authorization.actions.table.description")}
                >
                  <Input.TextArea
                    placeholder={
                      t("authorization.actions.table.description") || ""
                    }
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
