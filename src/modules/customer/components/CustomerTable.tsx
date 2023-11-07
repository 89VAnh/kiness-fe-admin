import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { useSearchCustomers } from "@/loader/customers.loader";
import { ICustomer } from "@/models/customer";
import { UserState } from "@/store/auth/atom";
import { compareNumbers, compareStrings } from "@/utils/array";
import { formatToDate } from "@/utils/format-string";

import CustomerDelete from "./CustomerDelete";
import CustomerModal from "./CustomerModal";

export default function CustomerTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "customer" });
  const userProfile = useRecoilValue(UserState);
  const [searchContent, setSearchContent] = useState<string>();
  const customers = useSearchCustomers({
    params: {
      pageIndex: 1,
      pageSize: 10,
      search_content: searchContent,
      user_id: userProfile.user_id,
    },
  });

  useEffect(() => {
    return () => customers.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customers.remove]);

  const handleSearch = (value: string) => {
    // const content = _.join(_.values(params), " ").trim();

    setSearchContent(value);
  };

  // const handleDeleteMulti = (keys: Key[]) => {
  //   deleteCustomer({
  //     list_json: keys.map((key) => ({ customer_id: key as string })),
  //     updated_by_id: userProfile.user_id,
  //   });

  //   message.success(t("message_delete_success"));
  // };

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
      sorter: (a, b) => compareStrings(a, b, "customer_id"),
      width: 100,
    },
    {
      title: t("fields.name"),
      dataIndex: "customer_name",
      sorter: (a, b) => compareStrings(a, b, "customer_name"),
      width: 200,
    },
    {
      title: t("fields.phone"),
      dataIndex: "phone_number",
      sorter: (a, b) => compareStrings(a, b, "phone_number"),
      width: 200,
    },
    {
      title: t("fields.gender"),
      dataIndex: "gender",
      sorter: (a, b) => compareNumbers(a, b, "gender"),
      width: 100,
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
      sorter: (a, b) => compareStrings(a, b, "birthday"),
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
      sorter: (a, b) => compareStrings(a, b, "email"),
      width: 200,
    },
    {
      title: t("fields.branch"),
      dataIndex: "branch_name",
      sorter: (a, b) => compareStrings(a, b, "branch_name"),
      width: 200,
    },
    {
      title: t("fields.verify"),
      dataIndex: "verify",
      sorter: (a, b) => compareNumbers(a, b, "verify"),
      width: 200,
      render: (value) => (
        <Tag color={value ? "green" : "red"}>
          {value ? "Đã xác thực" : "Chưa xác thực"}
        </Tag>
      ),
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
      cardBordered
      // rowSelection={rowSelection}
      loading={customers.isLoading}
      pagination={{
        pageSize: 10,
      }}
      columns={columns}
      dataSource={customers.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      // search={{
      //   resetText: "Reset",
      //   labelWidth: "auto",
      // }}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={(_) => [
        <Input.Search
          placeholder={t("search_placeholder")}
          loading={customers.isLoading}
          onSearch={handleSearch}
          onFocus={(e) => e.target.select()}
        />,
        <CustomerModal />,
        // selectedRowKeys?.length ? (
        //   <Button onClick={() => handleDeleteMulti(selectedRowKeys)} danger>
        //     {t("title_delete_multi")}
        //   </Button>
        // ) : (
        //   <></>
        // ),
      ]}
      rowKey={"customer_id"}
    />
  );
}
