import { EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { BASE_URL } from "@/constant/config";
import { queryClient } from "@/lib/react-query";
import { useBookAuthorDropdown } from "@/loader/book-author.loader";
import {
  CACHE_BOOK,
  useCreateBook,
  useGetBookById,
  useUpdateBook,
} from "@/loader/book.loader";
import { IBook } from "@/models/book";
import { uploadFile } from "@/services/upload.service";
import { UserState } from "@/store/auth/atom";
import { formatDatePost, formatDateShow } from "@/utils/format-string";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

interface Props {
  id?: number;
  isCreate?: boolean;
}

export default function BookModal({ id, isCreate = true }: Props): JSX.Element {
  const { t } = useTranslation();
  const { open, close, isOpen } = useDisclosure();
  const userProfile = useRecoilValue(UserState);
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const updatePage = useUpdateBook({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          handleCancel();
          queryClient.invalidateQueries([CACHE_BOOK.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createPage = useCreateBook({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));

          handleCancel();
          queryClient.invalidateQueries([CACHE_BOOK.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  useGetBookById({
    id: id!,
    enabled: isOpen && !isCreate,
    config: {
      onSuccess(data) {
        if (data) {
          form.setFieldsValue({
            ...data.data,
            publication_date: dayjs(data.data.publication_date.toString()),
          });

          setFileList([
            {
              name: "thumbnail",
              uid: "1",
              thumbUrl: `${BASE_URL}/` + data?.data?.image_url,
            },
          ]);
        }
      },
    },
  });

  const {
    data: authorOptions,
    isLoading: isLoadingAuthor,
    refetch: refetchAuthor,
  } = useBookAuthorDropdown({});

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        let dataFile;
        if (file) dataFile = await uploadFile({ file });

        const dataPost: IBook = {
          ...values,
          publication_date: values.publication_date.format(formatDatePost),
        };

        if (dataFile?.path) dataPost.image_url = dataFile.path;

        if (isCreate) {
          dataPost.created_by_user_id = userProfile.user_id;
          createPage.mutate(dataPost);
        } else {
          dataPost.lu_user_id = userProfile.user_id;
          updatePage.mutate(dataPost);
        }
      })
      .catch((err) => {
        console.log(err);
        message.warning(t("messages.validate_form"));
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setFile(null);
    close();
  };

  const handleOpen = () => {
    open();
    refetchAuthor();
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
      form.setFieldValue("image_url", []);
      setFileList([]);
      setFile(null);

      return false;
    },
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
        title={isCreate ? t("book.title_create") : t("book.title_update")}
        style={{ top: 58, padding: 0, minWidth: 800 }}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={updatePage.isLoading || createPage.isLoading}
      >
        <div
          style={{
            // height: "calc(100vh - 174px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={32}>
              <Form.Item name={"book_id"} hidden>
                <Input />
              </Form.Item>
              <Col span={16}>
                <Row gutter={32}>
                  <Col span={24}>
                    <Form.Item
                      name={"title"}
                      label={t("book.fields.title")}
                      rules={[...RULES_FORM.required]}
                    >
                      <Input placeholder={t("book.fields.title")} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={"author_id"}
                      label={t("book.fields.author")}
                      rules={[...RULES_FORM.required]}
                    >
                      <Select
                        loading={isLoadingAuthor}
                        placeholder={t("book.fields.author")}
                        options={authorOptions?.data || []}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={"publication_date"}
                      label={t("book.fields.publication_date")}
                      rules={[...RULES_FORM.required]}
                    >
                      <DatePicker
                        inputReadOnly
                        placeholder={formatDateShow.toLowerCase()}
                        format={formatDateShow}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col span={8}>
                <Form.Item
                  name={"image_url"}
                  label={t("book.fields.image_url")}
                >
                  <Upload
                    {...uploadProps}
                    listType="picture"
                    className="list-uploads"
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
