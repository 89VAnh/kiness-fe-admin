import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Space, Table, Typography } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { useSearchCustomers } from "@/loader/customers.loader";
import { ICustomer } from "@/models/customer";
import { UserState } from "@/store/auth/atom";
import { formatToDate } from "@/utils/format-string";

import CustomerDelete from "./CustomerDelete";
import CustomerModal from "./CustomerModal";

export default function CustomerTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "customer" });
  const userProfile = useRecoilValue(UserState);
  const customers = useSearchCustomers({
    params: {
      pageIndex: 1,
      pageSize: 10,
      user_id: userProfile.user_id,
    },
  });

  useEffect(() => {
    return () => customers.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customers.remove]);

  const columns: ProColumns<ICustomer>[] = [
    {
      title: t("fields.serial"),
      dataIndex: "serial",
      align: "center",
      width: 50,
      render: (_, __, index) => <Typography.Text>{++index}</Typography.Text>,
      search: false,
    },
    {
      title: t("fields.id"),
      dataIndex: "customer_id",
      width: 100,
    },
    {
      title: t("fields.name"),
      dataIndex: "customer_name",
      width: 200,
    },
    {
      title: t("fields.phone"),
      dataIndex: "phone_number",
      width: 200,
    },
    {
      title: t("fields.gender"),
      dataIndex: "gender",
      width: 80,
      render: (value) => (
        <Typography.Text>{value === 0 ? "Nam" : "Nữ"}</Typography.Text>
      ),
      search: false,
    },
    {
      title: t("fields.birthday"),
      dataIndex: "birthday",
      width: 150,
      align: "center",
      valueType: "date",
      render: (_, customer) => (
        <Typography.Text>
          {formatToDate(customer.birthday?.toString() || "")}
        </Typography.Text>
      ),
      search: false,
    },
    {
      title: t("fields.email"),
      dataIndex: "email",
      width: 200,
    },
    {
      title: t("fields.branch"),
      dataIndex: "branch_name",
      width: 200,
    },
    {
      title: t("fields.actions"),
      dataIndex: "action",
      width: 100,
      align: "center",
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <CustomerModal id={record?.customer_id} isCreate={false} />
            <CustomerDelete id={record?.customer_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        defaultSelectedRowKeys: [],
      }}
      loading={customers.isLoading}
      pagination={{
        pageSize: 10,
      }}
      columns={columns}
      dataSource={customers.data?.data || []}
      headerTitle={t("title")}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [<CustomerModal />]}
      rowKey={"customer_id"}
    />
  );
}
