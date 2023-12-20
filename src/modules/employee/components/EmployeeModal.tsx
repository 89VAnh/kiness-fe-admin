import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Tooltip,
  message,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { DefaultOptionType } from "antd/es/select";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { ERROR_TIMEOUT } from "@/constant/config";
import { queryClient } from "@/lib/react-query";
import { useCityDropdown } from "@/loader/city.loader";
import {
  CACHE_EMPLOYEES,
  useCreateEmployee,
  useGetEmployeeById,
  useUpdateEmployee,
} from "@/loader/employee.loader";
import { usePositionDropdown } from "@/loader/position.loader";
import { useRoleDropdown } from "@/loader/role.loader";
import { getBranchById, getBranchesDropdown } from "@/services/branch.service";
import { UserState } from "@/store/auth/atom";
import { formatDatePost, formatDateShow } from "@/utils/format-string";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: string;
  isCreate?: boolean;
}

const defaultDate = "2000-01-01";

export default function EmployeeModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const [form] = Form.useForm();
  const userProfile = useRecoilValue(UserState);
  const [birthday, setBirthDay] = useState<Dayjs | null>(dayjs(defaultDate));

  const { refetch: employeeRefetch } = useGetEmployeeById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      async onSuccess(data) {
        if (data.message === ERROR_TIMEOUT) {
          employeeRefetch();
        }

        if (!data?.message) {
          const branchData = await getBranchById(data.branch_id);
          const city_id = branchData.city_id;

          handleChangeCity(city_id);

          form.setFieldsValue({
            city: city_id,
            ...data,
            gender: `${data.gender}`,
            date_of_birth: dayjs(data.date_of_birth),
          });

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
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_EMPLOYEES.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createEmployee = useCreateEmployee({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_EMPLOYEES.SEARCH]);
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
      .then((values) => {
        const dataPost = {
          ...values,
          date_of_birth: birthday?.isValid()
            ? birthday.format(formatDatePost)
            : null,
          verify: values.verify ? 1 : 0,
        };

        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createEmployee.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateEmployee.mutate(dataPost);
          // console.log(dataPost);
        }
      })
      .catch(() => message.warning(t("messages.validate_form")));
  };

  const handleOpen = () => {
    open();
    if (isCreate) setBirthDay(dayjs(defaultDate));
  };

  const handleCancel = () => {
    form.resetFields();
    setBirthDay(null);
    close();
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const {
    data: cityOptions,
    isLoading: isLoadingCity,
    refetch: cityDropRefetch,
  } = useCityDropdown({
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          cityDropRefetch();
        }
      },
    },
  });
  const {
    data: positionOptions,
    isLoading: isLoadingPosition,
    refetch: positionDropRefetch,
  } = usePositionDropdown({
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          positionDropRefetch();
        }
      },
    },
  });
  const {
    data: roleOptions,
    isLoading: isLoadingRole,
    refetch: roleDropRefetch,
  } = useRoleDropdown({
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          roleDropRefetch();
        }
      },
    },
  });
  const [branchOptions, setBranchOptions] = useState<DefaultOptionType[]>([]);
  const [isLoadingBranch, setIsLoadingBranch] = useState<boolean>(false);

  const handleChangeCity = async (city_id: string) => {
    setIsLoadingBranch(true);
    const dropdown = await getBranchesDropdown({ city_id });
    if (!dropdown.message) setBranchOptions(dropdown);
    setIsLoadingBranch(false);
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
          isCreate ? t("employee.title_create") : "Sửa thông tin nhân viên"
        }
        width={"90vw"}
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
                <Form.Item
                  label={"Tài khoản"}
                  name={"employee_id"}
                  rules={[...RULES_FORM.required]}
                >
                  <Input disabled={!isCreate} />
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
              <Col span={6}>
                <Form.Item
                  name="city"
                  label={t("employee.fields.city")}
                  rules={[...RULES_FORM.required]}
                >
                  <Select
                    loading={isLoadingCity}
                    placeholder="Chọn tỉnh, thành phố"
                    style={{ width: "100%" }}
                    onChange={handleChangeCity}
                    options={cityOptions || []}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={"branch_id"}
                  label={t("employee.fields.branch")}
                  rules={[...RULES_FORM.required]}
                >
                  <Select
                    loading={isLoadingBranch}
                    placeholder="Chọn chi nhánh"
                    style={{ width: "100%" }}
                    options={branchOptions || []}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={"position_id"}
                  label={"Vị trí"}
                  rules={[...RULES_FORM.required]}
                >
                  <Select
                    loading={isLoadingPosition}
                    placeholder="Chọn vị trí"
                    style={{ width: "100%" }}
                    options={positionOptions?.message ? [] : positionOptions}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={"role_id"}
                  label={"Quyền"}
                  rules={[...RULES_FORM.required]}
                >
                  <Select
                    loading={isLoadingRole}
                    placeholder="Chọn quyền"
                    style={{ width: "100%" }}
                    options={roleOptions?.message ? [] : roleOptions}
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
