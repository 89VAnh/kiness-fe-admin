import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchHistories } from "@/loader/history.loader";
import { IHistory } from "@/models/history";
import { compareNumbers, compareStrings } from "@/utils/array";
import { formatDateShow } from "@/utils/format-string";

import HistoryDelete from "./HistoryDelete";
import HistoryModal from "./HistoryModal";

export default function HistoryTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "history" });
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

  const historyListQuery = useSearchHistories({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          historyListQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => historyListQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyListQuery.remove]);

  const handleSearch = (value: string, key = "a") => {
    searchParams.delete("page");
    searchParams.set(key, value);
    switch (key) {
      case "k":
        setSearchContent(value);
        break;
      default:
        break;
    }

    setSearchParams(searchParams);
    setPage(1);
  };

  const columns: ProColumns<IHistory>[] = [
    {
      title: t("fields.serial"),
      dataIndex: "serial",
      align: "center",
      width: 25,
      render: (_, __, index) => (
        <Typography.Text>
          {(Number(page) - 1) * Number(pageSize) + index + 1}
        </Typography.Text>
      ),
      search: false,
    },
    {
      title: t("fields.year"),
      dataIndex: "year",
      sorter: (a: any, b: any) => compareNumbers(a, b, "year"),
      width: 75,
    },
    {
      title: t("fields.content"),
      dataIndex: "content",
      width: 300,
      sorter: (a: any, b: any) => compareStrings(a, b, "content"),
      render: (value) => (
        <Typography.Paragraph ellipsis={{ rows: 2 }} title={value + ""}>
          {value}
        </Typography.Paragraph>
      ),
    },
    {
      title: t("fields.sort_order"),
      dataIndex: "sort_order",
      sorter: (a: any, b: any) => compareNumbers(a, b, "sort_order"),
      width: 50,
    },
    {
      title: t("fields.created_user"),
      dataIndex: "created_user",
      sorter: (a: any, b: any) => compareStrings(a, b, "created_user"),
      width: 75,
    },
    {
      title: t("fields.created_date_time"),
      dataIndex: "created_date_time",
      sorter: (a: any, b: any) => compareStrings(a, b, "created_date_time"),
      width: 75,
      render: (value) => (
        <Typography.Text>
          {dayjs(value?.toString()).format(formatDateShow)}
        </Typography.Text>
      ),
    },
    {
      title: t("fields.actions"),
      dataIndex: "actions",
      align: "center",
      search: false,
      width: 100,
      render: (_, record) => {
        return (
          <Space>
            <HistoryModal id={record?.history_id} isCreate={false} />
            <HistoryDelete id={record?.history_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      cardBordered
      loading={historyListQuery.isLoading}
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
        total: historyListQuery.data?.total_items || 0,
      }}
      columns={columns}
      dataSource={historyListQuery.data?.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={historyListQuery.isLoading}
          onSearch={(value) => handleSearch(value, "k")}
          style={{ minWidth: 150 }}
          onFocus={(e) => e.target.select()}
        />,
        <HistoryModal />,
      ]}
      rowKey="history_id"
    />
  );
}
