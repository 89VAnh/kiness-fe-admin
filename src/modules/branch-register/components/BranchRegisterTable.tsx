import { FileExcelOutlined } from "@ant-design/icons";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Space,
  Tag,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import {
  usePrintBranchRegister,
  useSearchBranchRegister,
} from "@/loader/branchRegister.loader";
import { IBranchRegister } from "@/models/branch_register";
import { UserState } from "@/store/auth/atom";
import { compareNumbers, compareStrings } from "@/utils/array";
import {
  formatDatePost,
  formatDateShow,
  formatToDate,
} from "@/utils/format-string";

import BranchRegisterDelete from "./BranchRegisterDelete";

export default function BranchRegisterTable(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "branch_register",
  });

  const { RangePicker } = DatePicker;

  const userProfile = useRecoilValue(UserState);
  const [rangeDate, setRangeDate] = useState<string[]>([]);
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
  const [status, setStatus] = useState<string | null>(
    searchParams.get("status") || null,
  );

  const branchRegister = useSearchBranchRegister({
    params: {
      pageIndex: page,
      pageSize: pageSize,
      search_content: searchContent,
      user_id: userProfile.user_id,
      status,
      from_date: rangeDate[0] ? rangeDate[0] : null,
      to_date: rangeDate[1] ? rangeDate[1] : null,
    },
  });

  useEffect(() => {
    return () => branchRegister.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchRegister.remove]);

  const handleSearch = (value: string) => {
    searchParams.delete("page");
    searchParams.set("k", value);
    setSearchParams(searchParams);
    setPage(1);

    setSearchContent(value);
  };

  const handleSearchStatus = (status: string) => {
    if (status !== undefined) searchParams.set("status", status);
    else searchParams.delete("status");

    setStatus(status);
  };

  const columns = [
    {
      title: t("fields.serial"),
      dataIndex: "RowNumber",
      align: "center",
      width: 50,
      render: (_: any, __: any, index: number) => (
        <Typography.Text>{++index}</Typography.Text>
      ),
      search: false,
    },
    {
      title: t("fields.branch_name"),
      dataIndex: "branch_name",
      sorter: (a: any, b: any) => compareStrings(a, b, "branch_name"),
      width: 200,
    },
    {
      title: t("fields.city_name"),
      dataIndex: "city_name",
      sorter: (a: any, b: any) => compareStrings(a, b, "city_name"),
      width: 200,
    },
    {
      title: t("fields.phone"),
      dataIndex: "phone_number",
      sorter: (a: any, b: any) => compareStrings(a, b, "phone_number"),
      width: 200,
    },
    {
      title: t("fields.address"),
      dataIndex: "address",
      sorter: (a: any, b: any) => compareNumbers(a, b, "address"),
      width: 200,
    },
    {
      title: t("fields.email"),
      dataIndex: "email",
      sorter: (a: any, b: any) => compareNumbers(a, b, "email"),
      width: 200,
    },
    {
      title: t("fields.status"),
      dataIndex: "status",
      sorter: (a: any, b: any) => compareNumbers(a, b, "status"),
      width: 200,
      render: (value: any) => (
        <Tag color={t(`status.${value}.color`)}>
          {t(`status.${value}.label`)}
        </Tag>
      ),
    },
    {
      title: t("fields.created_user"),
      dataIndex: "created_user",
      width: 150,
      align: "center",
      sorter: (a: any, b: any) => compareStrings(a, b, "created_user"),
    },
    {
      title: t("fields.created_date_time"),
      dataIndex: "created_date_time",
      width: 170,
      align: "center",
      valueType: "created_date_time",
      sorter: (a: any, b: any) => compareStrings(a, b, "created_date_time"),
      render: (
        _: any,
        register: { created_date_time: { toString: () => any } },
      ) => (
        <Typography.Text>
          {formatToDate(register.created_date_time?.toString() || "")}
        </Typography.Text>
      ),
      search: false,
    },
    {
      title: t("fields.actions"),
      dataIndex: "action",
      width: 100,
      align: "center",
      search: false,
      render: (_: any, record: { register_id: number; status: number }) => {
        return (
          <Space>
            {/* <BranchRegisterModal
              id={record?.register_id}
              isCreate={false}
            /> */}
            {/* <BranchRegisterConfirm
              id={record?.register_id}
              status={record?.status}
            /> */}

            <BranchRegisterDelete id={record?.register_id} />
          </Space>
        );
      },
    },
  ];

  const print = usePrintBranchRegister({
    config: {
      onSuccess: () => {
        message.success("Xuất file thành công");
      },
      onError: (res) => {
        message.error(res.message);
      },
    },
  });
  const handlePrint = () => {
    print.mutate({
      search_content: searchContent,
      user_id: userProfile.user_id,
      status,
      from_date: rangeDate[0] ? rangeDate[0] : null,
      to_date: rangeDate[1] ? rangeDate[1] : null,
    });
  };

  return (
    <ProTable
      size="small"
      cardBordered
      loading={branchRegister.isLoading}
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
        total: branchRegister.data?.totalItems || 0,
      }}
      columns={columns as ProColumns<IBranchRegister>[]}
      dataSource={branchRegister.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={(_) => [
        <Select
          placeholder={t("fields.status")}
          onChange={handleSearchStatus}
          options={[
            { value: "0", label: "Chưa xác nhận" },
            { value: "1", label: "Đã xác nhận" },
          ]}
          allowClear
          value={status}
        />,
        <RangePicker
          format={formatDateShow}
          style={{ width: 460 }}
          onChange={(range) => {
            setRangeDate(
              range
                ? range.map((x) => (x ? x.format(formatDatePost) : ""))
                : [],
            );
          }}
        />,
        <Input.Search
          placeholder={t("search_placeholder")}
          loading={branchRegister.isLoading}
          onSearch={handleSearch}
          onFocus={(e) => e.target.select()}
        />,
        <Button
          type="primary"
          icon={<FileExcelOutlined />}
          onClick={handlePrint}
          disabled={
            branchRegister.data?.data === undefined ||
            branchRegister.isLoading ||
            [...branchRegister.data.data].length === 0
          }
        >
          Xuất file
        </Button>,
      ]}
      rowKey={"register_id"}
    />
  );
}
