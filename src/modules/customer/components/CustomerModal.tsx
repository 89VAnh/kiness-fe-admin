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
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import { useCityDropdown } from "@/loader/city.loader";
import {
  CACHE_CUSTOMERS,
  useGetCustomerById,
  useUpdateCustomer,
} from "@/loader/customers.loader";
import { getBranchById, getBranchesDropdown } from "@/services/branch.service";
import { UserState } from "@/store/auth/atom";
import { formatDatePost, formatDateShow } from "@/utils/format-string";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: string;
  isCreate?: boolean;
}

export default function CustomerModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const [form] = Form.useForm();
  const userProfile = useRecoilValue(UserState);

  useGetCustomerById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      async onSuccess(data) {
        if (!data?.message) {
          const branchData = await getBranchById(data.branch_id);
          const city_id = branchData.city_id;

          handleChangeCity(city_id);

          form.setFieldsValue({
            city: city_id,
            ...data,
            birtday: null,
            gender: `${data.gender}`,
            birthday: dayjs(data.birtday),
          });
        }
      },
    },
  });

  const updateCustomer = useUpdateCustomer({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          close();
          queryClient.invalidateQueries([CACHE_CUSTOMERS.CUSTOMERS]);
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
          birthday: dayjs(values.birthday).format(formatDatePost),
          verify: values.verify ? 1 : 0,
        };

        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          // createPage.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateCustomer.mutate(dataPost);
        }
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

  const { data: cityOptions, isLoading: isLoadingCity } = useCityDropdown({});
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
        title={t("customer.title_create")}
        width={"90vw"}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={updateCustomer.isLoading}
      >
        <div
          style={{
            height: "calc(100vh - 174px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={32}>
              <Form.Item name={"customer_id"} hidden>
                <Input />
              </Form.Item>
              <Col span={12}>
                <Form.Item
                  name={"customer_name"}
                  label={t("customer.fields.name")}
                  rules={[...RULES_FORM.required, ...RULES_FORM.people_name]}
                >
                  <Input placeholder={t("customer.fields.name")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={"phone_number"}
                  label={t("customer.fields.phone")}
                  rules={[...RULES_FORM.required, ...RULES_FORM.phone]}
                >
                  <Input placeholder={t("customer.fields.phone")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={"gender"}
                  label={t("customer.fields.gender")}
                  rules={[...RULES_FORM.required]}
                >
                  <Radio.Group name="gender">
                    <Radio value="0">Nam</Radio>
                    <Radio value="1">Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={"birthday"}
                  label={t("customer.fields.birthday")}
                  rules={[...RULES_FORM.required]}
                >
                  <DatePicker
                    format={formatDateShow}
                    placeholder={formatDateShow.toLowerCase()}
                    name="birthday"
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={"email"}
                  label={t("customer.fields.email")}
                  rules={[...RULES_FORM.required, ...RULES_FORM.email]}
                >
                  <Input
                    type="email"
                    placeholder={t("customer.fields.email")}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="city"
                  label={t("customer.fields.city")}
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
                  label={t("customer.fields.branch")}
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
                <Form.Item name={"verify"} label={t("customer.fields.verify")}>
                  <Select
                    options={[
                      { label: "Xác thực", value: 1 },
                      { label: "Chưa xác thực", value: 0 },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"address"}
                  label={t("customer.fields.address")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input.TextArea placeholder={t("customer.fields.address")} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
