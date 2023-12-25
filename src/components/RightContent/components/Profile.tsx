import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { BASE_URL, ERROR_TIMEOUT, LOCAL_USER } from "@/constant/config";
import { queryClient } from "@/lib/react-query";
import {
  CACHE_EMPLOYEES,
  useGetEmployeeById,
  useUpdateEmployee,
} from "@/loader/employee.loader";
import { uploadFile } from "@/services/upload.service";
import { UserState } from "@/store/auth/atom";
import { formatDatePost, formatDateShow } from "@/utils/format-string";
import { useDisclosure } from "@/utils/modal";
import { storageService } from "@/utils/storage";
import { RULES_FORM } from "@/utils/validator";

const defaultDate = "2000-01-01";

export default function Profile(): JSX.Element {
  const { t } = useTranslation();
  const { isOpen, open, close } = useDisclosure();
  const [form] = Form.useForm();
  const userProfile = useRecoilValue(UserState);
  const setUserProfile = useSetRecoilState(UserState);
  const [birthday, setBirthDay] = useState<Dayjs | null>(dayjs(defaultDate));
  const [file, setFile] = useState<File | null>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {
    data: employee,
    refetch: employeeRefetch,
    remove: employeeRemove,
  } = useGetEmployeeById({
    id: userProfile.user_name,
    enabled: isOpen && !!userProfile.user_name,
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          employeeRefetch();
          return;
        }

        if (data.employee_id) {
          form.setFieldsValue(data);

          setFileList([
            {
              name: "avatar",
              uid: "1",
              thumbUrl: `${BASE_URL}/` + data.avatar,
            },
          ]);

          const date = dayjs(data.date_of_birth).isValid()
            ? dayjs(data.date_of_birth)
            : null;
          setBirthDay(date);
        }
      },
    },
  });

  const updateEmployee = useUpdateEmployee({
    config: {
      onSuccess: (data, variables) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_EMPLOYEES.SEARCH]);
          employeeRemove();
          resetUser(variables);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const resetUser = (data: any) => {
    const dataPost = {
      ...userProfile,
      ...data,
    };

    setUserProfile(dataPost);

    storageService.setStorage(LOCAL_USER, JSON.stringify(dataPost));
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        let dataFile;
        if (file) dataFile = await uploadFile({ file });

        const dataPost = {
          ...employee,
          ...values,
          date_of_birth: birthday?.isValid()
            ? birthday.format(formatDatePost)
            : null,
          verify: values.verify ? 1 : 0,
        };

        if (dataFile?.path) dataPost.avatar = dataFile.path;

        dataPost.lu_user_id = userProfile.user_id;
        updateEmployee.mutate(dataPost);
        // console.log(dataPost);
      })
      .catch(() => message.warning(t("messages.validate_form")));
  };

  const handleCancel = () => {
    form.resetFields();
    close();
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const uploadProps: UploadProps = {
    maxCount: 1,
    accept: "image/*",
    listType: "picture-card",
    fileList,
    beforeUpload(file) {
      setFile(file);
      return false;
    },
    onChange({ fileList }: any) {
      setFileList(fileList);
    },
    onRemove() {
      form.setFieldValue("image", []);
      setFile(null);

      return false;
    },
  };

  return (
    <>
      <Typography.Text onClick={open}>
        {t("avatar.profile.title")}
      </Typography.Text>
      <Modal
        title={t("avatar.profile.title")}
        width={"60vw"}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={updateEmployee.isLoading}
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
              <Col span={8}>
                {/* <Form.Item
                  label={"Tài khoản"}
                  name={"employee_id"}
                  rules={[...RULES_FORM.required]}
                >
                  <Input disabled />
                </Form.Item> */}
                <Form.Item name={"avatar"} label={t("employee.fields.avatar")}>
                  <Upload {...uploadProps} listType="picture-circle">
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Form.Item name={"user_id"} hidden>
                <Input />
              </Form.Item>
              <Col span={8}>
                <Form.Item
                  name={"fullname"}
                  label={t("employee.fields.name")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input placeholder={t("employee.fields.name")} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name={"phone_number"}
                  label={t("employee.fields.phone")}
                  rules={[...RULES_FORM.required, ...RULES_FORM.phone]}
                >
                  <Input placeholder={t("employee.fields.phone")} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={"gender"}
                  label={t("employee.fields.gender")}
                  initialValue={0}
                  rules={[...RULES_FORM.required]}
                >
                  <Radio.Group name="gender">
                    <Radio value={1}>Nam</Radio>
                    <Radio value={0}>Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={t("employee.fields.birthday")}
                  rules={[...RULES_FORM.required]}
                >
                  <DatePicker
                    inputReadOnly
                    format={formatDateShow}
                    style={{ width: "100%" }}
                    value={birthday}
                    onChange={setBirthDay}
                    placeholder={formatDateShow.toLowerCase()}
                    name="date_of_birth"
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name={"email"}
                  label={t("employee.fields.email")}
                  rules={[...RULES_FORM.required, ...RULES_FORM.email]}
                >
                  <Input
                    type="email"
                    placeholder={t("employee.fields.email")}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"address"}
                  label={t("employee.fields.address")}
                  // rules={[...RULES_FORM.required]}
                >
                  <Input.TextArea placeholder={t("employee.fields.address")} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
