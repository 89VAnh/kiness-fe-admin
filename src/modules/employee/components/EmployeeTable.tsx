import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { useSearchEmployees } from "@/loader/employees.loader";
import { IEmployee } from "@/models/employee";
import { UserState } from "@/store/auth/atom";
import { compareNumbers, compareStrings } from "@/utils/array";
import { formatToDate } from "@/utils/format-string";

import EmployeeDelete from "./EmployeeDelete";
import EmployeeModal from "./EmployeeModal";

export default function EmployeeTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "employee" });
  const userProfile = useRecoilValue(UserState);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchContent, setSearchContent] = useState<string>(
    searchParams.get("k") || "",
  );
  const [page, setPage] = useState<number | string>(
    searchParams.get("page") || 1,
  );
  const [pageSize, setPageSize] = useState<number | string>(
    searchParams.get("page_size") || 10,
  );
  const employees = useSearchEmployees({
    params: {
      pageIndex: page,
      pageSize: pageSize,
      search_content: searchContent,
      user_id: userProfile.user_id,
    },
  });

  useEffect(() => {
    return () => employees.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees.remove]);

  const handleSearch = (value: string) => {
    searchParams.delete("page");
    searchParams.set("k", value);
    setSearchParams(searchParams);
    setPage(1);

    setSearchContent(value);
  };

  const columns: ProColumns<IEmployee>[] = [
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
      dataIndex: "employee_id",
      sorter: (a, b) => compareStrings(a, b, "employee_id"),
      width: 100,
    },
    {
      title: t("fields.position"),
      dataIndex: "position_name",
      sorter: (a, b) => compareStrings(a, b, "position_name"),
      width: 100,
    },
    {
      title: t("fields.name"),
      dataIndex: "fullname",
      sorter: (a, b) => compareStrings(a, b, "fullname"),
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
      render: (_, employee) => (
        <Typography.Text>
          {formatToDate(employee.birthday?.toString() || "")}
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
      title: t("fields.actions"),
      dataIndex: "action",
      width: 100,
      align: "center",
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <EmployeeModal id={record?.employee_id} isCreate={false} />
            <EmployeeDelete id={record?.employee_id} />
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
      loading={employees.isLoading}
      pagination={{
        pageSize: Number(searchParams.get("page_size")) || 10,
        current: Number(searchParams.get("page")) || 1,
        onChange(page, pageSize) {
          searchParams.set("page", page + "");
          searchParams.set("page_size", pageSize + "");
          setPage(page);
          setPageSize(pageSize);
          setSearchParams(searchParams);
        },
        showTotal(total, range) {
          return `${range[0]}-${range[1]} trên ${total}`;
        },
        total: employees.data?.totalItems || 0,
      }}
      columns={columns}
      dataSource={employees.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={(_) => [
        <Input.Search
          placeholder={t("search_placeholder")}
          loading={employees.isLoading}
          onSearch={handleSearch}
          style={{ minWidth: 300 }}
          onFocus={(e) => e.target.select()}
        />,
        <EmployeeModal />,
      ]}
      rowKey={"employee_id"}
    />
  );
}
