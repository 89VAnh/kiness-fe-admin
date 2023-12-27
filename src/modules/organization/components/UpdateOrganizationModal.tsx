import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Tooltip,
  TreeSelect,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { ERROR_TIMEOUT } from "@/constant/config";
import { queryClient } from "@/lib/react-query";
import {
  CACHE_DIAGRAM,
  useGetDiagramById,
  useUpdateDiagram,
} from "@/loader/diagram.loader";
import { IDiagram } from "@/models/diagram";
import { UserState } from "@/store/auth/atom";
import { useDisclosure } from "@/utils/modal";
import { RULES_FORM } from "@/utils/validator";

import { getNodeFromTree } from "../utils/utils";

interface Props {
  node: IDiagram | undefined;
  tree: any;
}

export function UpdateOrganizationModal({ node, tree }: Props): JSX.Element {
  const [form] = Form.useForm();
  const { isOpen, close, open } = useDisclosure();
  const { t } = useTranslation();
  const userRecoil = useRecoilValue(UserState);
  const [parentId, setParentId] = useState(node?.key || "1");

  useEffect(() => setParentId(node?.key || "1"), [node]);

  const { refetch, remove } = useGetDiagramById({
    id: node?.key!,
    config: {
      enabled: isOpen && !!node?.key,
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          refetch();
        }
        if (data.success) {
          form.setFieldsValue(data?.data);
        }
      },
    },
  });

  const updateDiagram = useUpdateDiagram({
    config: {
      onSuccess: (data) => {
        if (data.success) {
          message.success(t("messages.update_success"));
          queryClient.invalidateQueries([CACHE_DIAGRAM.SEARCH]);
          handleCancel();
        } else message.error(data.message);
      },
      onError: () => {
        message.error(t("messages.update_failure"));
      },
    },
  });

  const handleOpen = () => {
    open();
  };

  const handleCancel = () => {
    remove();
    setParentId("");
    form.resetFields();
    close();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const item = parentId ? getNodeFromTree(tree, parentId) : node;
        const dataPost = {
          ...values,
          node_id: node?.key,
          level: item?.level,
          lu_user_id: userRecoil.user_id,
        };
        updateDiagram.mutate(dataPost);
      })
      .catch(() => {
        message.warning(t("messages.validate_form"));
      });
  };

  const handelChangeParentDiagram = (newValue: string) => {
    setParentId(newValue);
  };

  return (
    <>
      <Tooltip title={t("all.btn_update")}>
        <Button type="default" disabled={!node?.key} onClick={handleOpen}>
          <EditOutlined style={{ color: "#faad14" }} />
        </Button>
      </Tooltip>

      <Modal
        style={{ top: 110 }}
        open={isOpen}
        width={"40%"}
        title={t("organization.title_update")}
        okText={t("all.btn_save")}
        cancelText={t("all.btn_cancel")}
        onOk={handleOk}
        maskClosable={false}
        destroyOnClose
        onCancel={handleCancel}
        confirmLoading={updateDiagram.isLoading}
      >
        <div className="modal-body">
          <Form form={form} layout="vertical">
            <Row gutter={32}>
              <Col span={12}>
                <Form.Item
                  label={t("organization.fields.group")}
                  name={"parent_id"}
                  rules={[...RULES_FORM.required]}
                  initialValue={node?.key}
                  valuePropName="title"
                >
                  <TreeSelect
                    showSearch
                    style={{ width: "100%" }}
                    value={parentId}
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    onChange={handelChangeParentDiagram}
                    treeNodeFilterProp="title"
                    treeDefaultExpandedKeys={[node?.key ? node.key : "0"]}
                    treeData={tree || []}
                  />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
              <Col span={12}>
                <Form.Item
                  label={t("organization.fields.node_name")}
                  name={"node_name"}
                  rules={[...RULES_FORM.required]}
                >
                  <Input
                    placeholder={t("organization.fields.node_name") || ""}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="sort_order"
                  label={t("organization.fields.sort_order")}
                  initialValue={0}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder={t("organization.fields.sort_order") || ""}
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label={t("organization.fields.description")}
                >
                  <Input.TextArea
                    style={{ width: "100%" }}
                    placeholder={t("organization.fields.description") || ""}
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
