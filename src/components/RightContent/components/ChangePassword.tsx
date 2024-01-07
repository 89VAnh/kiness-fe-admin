import { Col, Form, Input, Modal, Row, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { LOCAL_USER } from "@/constant/config";
import { useChangePasswordEmployee } from "@/loader/employee.loader";
import { UserState } from "@/store/auth/atom";
import { LOGIN_URL } from "@/urls";
import { useDisclosure } from "@/utils/modal";
import storage, { storageService } from "@/utils/storage";
import { RULES_FORM } from "@/utils/validator";

export default function ChangePassword(): JSX.Element {
  const { t } = useTranslation();
  const { isOpen, open, close } = useDisclosure();
  const [form] = Form.useForm();
  const userProfile = useRecoilValue(UserState);
  const password = Form.useWatch([], form);
  const navigate = useNavigate();

  const logOut = async () => {
    const urlParams = new URL(window.location.href).searchParams;
    const redirect = urlParams.get("redirect");
    if (window.location.pathname !== LOGIN_URL && !redirect) {
      storage.clearToken();
      storageService.clearStorage(LOCAL_USER);
      navigate(LOGIN_URL, {
        preventScrollReset: true,
        replace: true,
      });
    }
  };

  const changePassword = useChangePasswordEmployee({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          logOut();
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
        const dataPost = {
          ...values,
          user_id: userProfile.user_id,
        };
        dataPost.lu_user_id = userProfile.user_id;
        changePassword.mutate(dataPost);
        // console.log(dataPost);
      })
      .catch(() => message.warning(t("messages.validate_form")));
  };

  const handleCancel = () => {
    form.resetFields();
    close();
  };

  return (
    <>
      <Typography.Text onClick={open}>
        {t("avatar.change_password.title")}
      </Typography.Text>

      <Modal
        title={t("avatar.change_password.title")}
        width={400}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        maskClosable={false}
        confirmLoading={changePassword.isLoading}
      >
        <Form form={form} layout="vertical">
          <Row gutter={32}>
            <Col span={24}>
              <Form.Item
                name={"old_password"}
                label={t("avatar.change_password.fields.old_password")}
                rules={[...RULES_FORM.required]}
              >
                <Input.Password
                  placeholder={
                    t("avatar.change_password.fields.old_password") || ""
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={"new_password"}
                label={t("avatar.change_password.fields.new_password")}
                rules={[...RULES_FORM.required, ...RULES_FORM.password]}
              >
                <Input.Password
                  placeholder={
                    t("avatar.change_password.fields.new_password") || ""
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={"confirm_password"}
                label={t("avatar.change_password.fields.confirm_password")}
                rules={[
                  // @ts-ignore
                  ...RULES_FORM.confirm_password(
                    password?.new_password,
                    password?.confirm_password,
                  ),
                  ...RULES_FORM.required,
                ]}
              >
                <Input.Password
                  placeholder={
                    t("avatar.change_password.fields.confirm_password") || ""
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
