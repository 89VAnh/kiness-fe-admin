import { Col, Input, Row, Table, TableColumnsType, Typography } from "antd";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchActions } from "@/loader/action.loader";
import { IAction } from "@/models/action";
import { getFunctionIdSelector } from "@/modules/authorization/store/state";
import { UserState } from "@/store/auth/atom";

import styles from "../../../../scss/styles.module.scss";
import { ActionModal } from "./ActionModal";
import { DeleteActionModal } from "./DeleteActionModal";

export default function ActionTable(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const function_id = useRecoilValue(getFunctionIdSelector);
  const { t } = useTranslation();
  const userRecoil = useRecoilValue(UserState);

  // Set init params
  const pageIndex = Number(searchParams.get("index_action")) || 1;
  const pageSize = Number(searchParams.get("size_action")) || 10;
  const searchContent = searchParams.get("search_action") || "";

  const actionsQuery = useSearchActions({
    params: {
      pageIndex,
      pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
      function_id,
      user_id: userRecoil.user_id,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          actionsQuery.refetch();
        }
      },
    },
  });

  const handleSearch = (value: string) => {
    searchParams.set("search_action", value.trim());
    searchParams.delete("index_action");
    searchParams.delete("size_action");
    setSearchParams(searchParams);
  };

  const columns: TableColumnsType<IAction> = [
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
      width: "15%",
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
      width: "35%",
      sorter: (a, b) => {
        const nameA = a.action_name?.toUpperCase(); // ignore upper and lowercase
        const nameB = b.action_name?.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) return -1;

        if (nameA > nameB) return 1;

        // names must be equal
        return 0;
      },
    },
    {
      title: t("authorization.actions.table.action"),
      width: "5%",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Row justify={"space-evenly"}>
            <Col>
              <ActionModal isCreate={false} id={record?.action_code} />
            </Col>
            <Col>
              <DeleteActionModal id={record.action_code} />
            </Col>
          </Row>
        );
      },
    },
  ];

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
          <Col
            span={7}
            style={{ maxWidth: "400px", marginLeft: "auto" }}
            className={styles.padding_none}
          >
            <Input.Search
              onSearch={handleSearch}
              placeholder={
                t("authorization.actions.search_placeholder") || undefined
              }
            />
          </Col>
        </div>
        <Col className={styles.padding_l_1}>
          <ActionModal isCreate={true} />
        </Col>
      </Row>
      <Table
        size="small"
        className={styles.table_small}
        bordered
        columns={columns}
        loading={actionsQuery.isLoading}
        dataSource={actionsQuery?.data?.data}
        pagination={{
          total: actionsQuery?.data?.totalItems,
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
