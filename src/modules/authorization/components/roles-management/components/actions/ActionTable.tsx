import {
  Button,
  Col,
  Input,
  Row,
  Table,
  TableColumnsType,
  Typography,
  notification,
} from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchActions } from "@/loader/action.loader";
import { useCreatePermissionForFunction } from "@/loader/permission.loader";
import { changedActionState } from "@/modules/authorization/store/atom";
import {
  getFunctionIdRoleSelector,
  getRoleIdSelector,
} from "@/modules/authorization/store/state";
import { getPermissionsByFunction } from "@/services/permission.service";
import { UserState } from "@/store/auth/atom";

import styles from "../../../../scss/styles.module.scss";
import { filterNot } from "../../utils/array";

export default function ActionTable(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const function_id = useRecoilValue(getFunctionIdRoleSelector);
  const role_id = useRecoilValue(getRoleIdSelector);
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isChanged, setIsChanged] = useRecoilState<any>(changedActionState);
  const resetActionState = useResetRecoilState(changedActionState);
  const userRecoil = useRecoilValue(UserState);

  // Set init params
  const pageIndex = Number(searchParams.get("index_action")) || 1;
  const pageSize = Number(searchParams.get("size_action")) || 10;
  const searchContent = searchParams.get("search_action") || "";

  const actionsQuery = useSearchActions({
    params: {
      page_index: pageIndex,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
      function_id,
      user_id: userRecoil.user_id,
    },
    config: {
      enabled: !!function_id,
      onSuccess: async (data) => {
        if (data.message === ERROR_TIMEOUT) {
          actionsQuery.refetch();
        }
        const newData = await getPermissionsByFunction({
          role_id,
          function_id,
        });

        setSelectedRowKeys(newData);
      },
    },
  });

  const createPermissions = useCreatePermissionForFunction({
    config: {
      onSuccess: (data) => {
        notification.success({
          message: data.message || t("messages.create_success"),
        });

        resetActionState();
      },
      onError: () => {
        notification.error({
          message: t("messages.update_failure"),
        });
      },
    },
  });

  const handleSearch = (value: string) => {
    searchParams.set("search_action", value.trim());
    searchParams.delete("index_action");
    searchParams.delete("size_action");
    setSearchParams(searchParams);
  };

  const columns: TableColumnsType<any> = [
    {
      title: t("authorization.actions.table.stt"),
      width: "5%",
      align: "center",
      dataIndex: "RowNumber",
      render: (_, __, index) => (
        <Typography.Text style={{ textAlign: "center" }}>
          {++index}
        </Typography.Text>
      ),
    },
    {
      title: t("authorization.actions.table.action_code"),
      dataIndex: "action_code",
      width: "20%",
      key: "action_code",
      sorter: (a, b) => {
        const nameA = a.action_code?.toUpperCase(); // ignore upper and lowercase
        const nameB = b.action_code?.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) return -1;

        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
      },
    },
    {
      title: t("authorization.actions.table.action_name"),
      dataIndex: "action_name",
      sorter: (a, b) => {
        const nameA = a.action_name?.toUpperCase(); // ignore upper and lowercase
        const nameB = b.action_name?.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) return -1;

        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setIsChanged({
      isChanged: true,
      fn: handleOk,
    });
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
    columnWidth: "50px",
  };

  const handleOk = () => {
    const dataPost = {
      role_permission_list: [
        ...selectedRowKeys?.map((i: any) => ({
          role_permission_id: "",
          role_id,
          function_id,
          action_code: i,
          active_flag: 1,
        })),
        ...(filterNot(
          actionsQuery?.data?.data || [],
          selectedRowKeys,
          "action_code",
        ).map((i) => ({
          role_permission_id: "",
          role_id,
          function_id,
          action_code: i.action_code,
          active_flag: 0,
        })) || []),
      ],
      created_by_user_id: userRecoil.user_id || userRecoil.user_name,
    };
    createPermissions.mutate(dataPost);
  };

  return (
    <>
      <Row
        align={"middle"}
        className={styles.head_manager_wrap}
        style={{ padding: 0, paddingBottom: 10 }}
      >
        <Col>
          <Typography.Title level={5} style={{ marginBottom: 0 }}>
            {t("authorization.actions.title")}
          </Typography.Title>
        </Col>
        <div style={{ flex: "1 1 0" }}>
          <Row justify={"end"}>
            <Col style={{ marginRight: 10 }}>
              <Button
                type="primary"
                className={`${styles.button} ${styles.btn_add}`}
                style={{ marginBottom: 0 }}
                disabled={!isChanged?.isChanged}
                onClick={handleOk}
                loading={createPermissions.isLoading}
              >
                {t("all.btn_save")}
              </Button>
            </Col>
            <Col
              span={7}
              style={{ maxWidth: "400px" }}
              className={styles.padding_none}
            >
              <Input.Search
                onSearch={handleSearch}
                placeholder={
                  t("authorization.actions.search_placeholder") || undefined
                }
              />
            </Col>
          </Row>
        </div>
      </Row>
      <Table
        rowSelection={rowSelection}
        size="small"
        className={styles.table_small}
        bordered
        columns={columns}
        loading={actionsQuery?.isLoading}
        dataSource={actionsQuery?.data?.data}
        pagination={{
          total: actionsQuery?.data?.total_items,
          current: pageIndex,
          pageSize,
          onChange: (page, pageSize) => {
            searchParams.set("index_action", String(page));
            searchParams.set("size_action", String(pageSize));
            setSearchParams(searchParams);
          },
          showTotal(total, range) {
            return (
              `${range[0]}-${range[1]} trên ${total} ` +
              t("authorization.actions.title").toLowerCase()
            );
          },
        }}
        rowKey={(record) => record.action_code}
      />
    </>
  );
}
