import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip, message } from "antd";
import { Select } from "antd/lib";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { queryClient } from "@/lib/react-query";
import {
  CACHE_BRANCH,
  useCreateBranch,
  useGetBranchById,
  useUpdateBranch,
} from "@/loader/branch.loader";
import { useCityDropdown } from "@/loader/city.loader";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: number;
  isCreate?: boolean;
}

export default function BranchModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);
  const [form] = Form.useForm();
  const embedMap = Form.useWatch("embed_map", form);

  const { data: cityOptions, isLoading: isLoadingCity } = useCityDropdown({});

  const updateBranch = useUpdateBranch({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_BRANCH.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createBranch = useCreateBranch({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_BRANCH.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  useGetBranchById({
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

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        // let dataFile;
        // if (file) dataFile = await uploadFile({ file });

        const dataPost = {
          ...values,
          // thumbnail: dataFile
          //   ? dataFile.path
          //   : fileList?.[0]?.thumbUrl?.replace("/api/", ""),
        };
        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createBranch.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updateBranch.mutate(dataPost);
        }
      })
      .catch(() => {
        message.warning(t("messages.validate_form"));
      });
  };

  const handleCancel = () => {
    form.resetFields();
    close();
  };

  // const uploadProps: UploadProps = {
  //   maxCount: 1,
  //   accept: "image/*",
  //   listType: "picture-card",
  //   fileList,
  //   beforeUpload(file) {
  //     setFile(file);
  //     return false;
  //   },
  //   onChange({ fileList }: any) {
  //     setFileList(fileList);
  //   },
  //   onRemove() {
  //     form.setFieldValue("image", []);
  //     setFile(null);

  //     return false;
  //   },
  // };

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
        title={isCreate ? t("branch.title_create") : t("branch.title_update")}
        style={{ top: 58, padding: 0, minWidth: 600 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={updateBranch.isLoading || createBranch.isLoading}
      >
        <div
          style={{
            // height: "calc(100vh - 174px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Form
            form={form}
            spellCheck={false}
            layout="vertical"
            style={{ marginRight: 5 }}
          >
            <Row gutter={32}>
              <Form.Item name={"branch_id"} hidden>
                <Input />
              </Form.Item>
              <Col span={8}>
                <Form.Item
                  name={"branch_name"}
                  label={t("branch.fields.branch_name")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input placeholder={t("branch.fields.branch_name")} />
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item
                  name={"news_thumbnail"}
                  label={t("news.fields.thumbnail")}
                  rules={[...RULES_FORM.required]}
                >
                  <Upload {...uploadProps}>
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col> */}
              <Col span={8}>
                <Form.Item
                  name={"phone"}
                  label={t("branch.fields.phone")}
                  rules={[...RULES_FORM.required, ...RULES_FORM.phone]}
                >
                  <Input placeholder={t("branch.fields.phone")} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={"city_id"}
                  label={t("branch.fields.city")}
                  rules={[...RULES_FORM.required]}
                >
                  <Select
                    loading={isLoadingCity}
                    placeholder="Chọn tỉnh, thành phố"
                    options={cityOptions || []}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name={"open_time"}
                  label={t("branch.fields.open_time")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input placeholder={t("branch.fields.open_time")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={"close_time"}
                  label={t("branch.fields.close_time")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input placeholder={t("branch.fields.close_time")} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name={"embed_map"}
                  label={t("branch.fields.embed_map")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input
                    placeholder={
                      t("branch.fields.embed_map") + ": <iframe>...</iframe>"
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <div
                  style={{ maxHeight: 200, overflow: "hidden" }}
                  dangerouslySetInnerHTML={{
                    __html: embedMap?.includes("<iframe")
                      ? embedMap
                      : `Không đúng định dạng <br/>
                      Hướng dẫn gắn địa chỉ : <br/>
                      1. Nhập thông tin địa chỉ vào google map <br/>
                      2. Chọn chia sẻ > nhúng bản đồ > sao chép HTML <br/>
                      3. Dán vào ô địa chỉ bên trên`,
                  }}
                ></div>
              </Col>

              <Col span={24}>
                <Form.Item
                  name={"address"}
                  label={t("branch.fields.address")}
                  rules={[...RULES_FORM.required]}
                >
                  <Input placeholder={t("branch.fields.address")} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
