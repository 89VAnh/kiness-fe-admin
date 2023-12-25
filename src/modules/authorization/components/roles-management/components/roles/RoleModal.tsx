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

import { queryClient } from "@/lib/react-query";
import {
  CACHE_ROLE,
  useCreateRole,
  useGetRoleById,
  useUpdateRole,
} from "@/loader/role.loader";
import { RULES_FORM } from "@/modules/authorization/utils/validator";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";

import styles from "../../../../scss/styles.module.scss";

interface Props {
  isCreate: boolean;
  id?: string | number;
}

export function RoleModal({ isCreate, id }: Props): JSX.Element {
  const [form] = Form.useForm();
  const { isOpen, close, open } = useDisclosure();
  const userRecoil = useRecoilValue(UserState);
  const { t } = useTranslation();

  useGetRoleById({
    id: id!,
    enabled: isOpen && !!id,
    config: {
      onSuccess: (data) => {
        form.setFieldsValue(data);
      },
    },
  });

  const createRole = useCreateRole({
    config: {
      onSuccess: () => {
        notification.success({
          message: t("messages.create_success"),
        });
        close();
        queryClient.invalidateQueries([CACHE_ROLE.SEARCH]);
        form.resetFields();
      },
      onError: () => {
        notification.error({
          message: t("messages.create_failure"),
        });
      },
    },
  });

  const updateRole = useUpdateRole({
    config: {
      onSuccess: () => {
        notification.success({
          message: t("messages.update_success"),
        });
        close();
        queryClient.invalidateQueries([CACHE_ROLE.SEARCH]);
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
    form.resetFields();
    close();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const dataPost = {
          ...values,
          role_id: id,
          lu_user_id: userRecoil.user_id,
          created_by_user_id: userRecoil.user_id,
        };
        isCreate ? createRole.mutate(dataPost) : updateRole.mutate(dataPost);
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
        <Tooltip title={t("all.btn_add")}>
          <Button
            type="primary"
            onClick={handleOpen}
            className={`${styles.button} ${styles.btn_add}`}
          >
            {t("all.btn_add")}
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title={t("all.btn_update")}>
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
        centered
        title={
          isCreate
            ? t("authorization.roles.modal.title_create")
            : t("authorization.roles.modal.title_update")
        }
        open={isOpen}
        width={"40%"}
        okText={t("all.btn_save")}
        cancelText={t("all.btn_cancel")}
        onOk={handleOk}
        maskClosable={false}
        destroyOnClose
        onCancel={handleCancel}
        // confirmLoading={createFee.isLoading}
      >
        <Form form={form} layout="vertical">
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label={t("authorization.roles.table.role_code")}
                name={"role_code"}
                rules={[...RULES_FORM.required]}
              >
                <Input
                  placeholder={t("authorization.roles.table.role_code") || ""}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("authorization.roles.table.role_name")}
                name={"role_name"}
                rules={[...RULES_FORM.required]}
              >
                <Input
                  placeholder={t("authorization.roles.table.role_name") || ""}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label={t("authorization.roles.table.description")}
              >
                <Input.TextArea
                  style={{ width: "100%" }}
                  placeholder={t("authorization.roles.table.description") || ""}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
