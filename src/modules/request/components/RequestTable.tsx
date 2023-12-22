import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Select, Space, Tag, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchRequests } from "@/loader/request.loader";
import { IRequest } from "@/models/request";
import { compareNumbers, compareStrings } from "@/utils/array";

import { acceptOptions, answerOptions } from "../data/data-fake";
import RequestDelete from "./RequestDelete";
import RequestModal from "./RequestModal";

export default function RequestTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "request" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchContent, setSearchContent] = useState<string>(
    searchParams.get("k") || "",
  );
  const [acceptStatus, setAcceptStatus] = useState<string>(
    searchParams.get("a") || "",
  );
  const [answerStatus, setAnswerStatus] = useState<string>(
    searchParams.get("s") || "",
  );
  const [page, setPage] = useState<number | string>(
    searchParams.get("page") || 1,
  );
  const [pageSize, setPageSize] = useState<number | string>(
    searchParams.get("page_size") || 10,
  );

  const requestListQuery = useSearchRequests({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
      is_accepted: isEmpty(acceptStatus) ? null : +acceptStatus,
      is_answered: isEmpty(answerStatus) ? null : +answerStatus,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          requestListQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => requestListQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestListQuery.remove]);

  const handleSearch = (value: string, key = "a") => {
    searchParams.delete("page");
    searchParams.set(key, value);
    switch (key) {
      case "k":
        setSearchContent(value);
        break;
      case "a":
        setAcceptStatus(value);
        break;
      case "s":
        setAnswerStatus(value);
        break;
      default:
        break;
    }

    setSearchParams(searchParams);
    setPage(1);
  };

  const columns: ProColumns<IRequest>[] = [
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
      title: t("fields.subject"),
      dataIndex: "subject",
      sorter: (a: any, b: any) => compareStrings(a, b, "subject"),
      width: "15%",
    },
    {
      title: t("fields.content"),
      dataIndex: "content",
      sorter: (a: any, b: any) => compareStrings(a, b, "content"),
      render: (value) => (
        <Typography.Text style={{ width: 150 }} ellipsis title={value + ""}>
          {value}
        </Typography.Text>
      ),
    },
    {
      title: t("fields.answer"),
      dataIndex: "answer",
      sorter: (a: any, b: any) => compareStrings(a, b, "answer"),
      render: (value) => (
        <Typography.Text style={{ width: 150 }} ellipsis title={value + ""}>
          {value}
        </Typography.Text>
      ),
    },
    {
      title: t("fields.author_name"),
      dataIndex: "author_name",
      width: 150,
      sorter: (a: any, b: any) => compareStrings(a, b, "author_name"),
    },
    {
      title: t("fields.phone_number"),
      dataIndex: "phone_number",
      sorter: (a: any, b: any) => compareStrings(a, b, "phone_number"),
    },
    {
      title: t("fields.email"),
      dataIndex: "email",
      sorter: (a: any, b: any) => compareStrings(a, b, "email"),
    },
    {
      title: t("fields.answered_by"),
      dataIndex: "answered_by",
      sorter: (a: any, b: any) => compareStrings(a, b, "answered_by"),
    },
    {
      title: t("fields.is_accepted.title"),
      dataIndex: "is_accepted",
      sorter: (a: any, b: any) => compareNumbers(a, b, "is_accepted"),
      width: 120,
      render: (value: any) => (
        <Tag color={t(`fields.is_accepted.${value}.color`)}>
          {t(`fields.is_accepted.${value}.label`)}
        </Tag>
      ),
    },
    {
      title: t("fields.is_answered.title"),
      dataIndex: "is_answered",
      sorter: (a: any, b: any) => compareNumbers(a, b, "is_answered"),
      width: 120,
      render: (value: any) => (
        <Tag color={t(`fields.is_answered.${value}.color`)}>
          {t(`fields.is_answered.${value}.label`)}
        </Tag>
      ),
    },
    {
      title: t("fields.actions"),
      dataIndex: "actions",
      width: 50,
      align: "center",
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <RequestModal id={record?.request_id} isCreate={false} />
            <RequestDelete id={record?.request_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      cardBordered
      loading={requestListQuery.isLoading}
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
        total: requestListQuery.data?.total_items || 0,
      }}
      columns={columns}
      dataSource={requestListQuery.data?.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [
        <Select
          options={acceptOptions}
          defaultValue={acceptStatus ? +acceptStatus : ""}
          onChange={(value) => handleSearch(value + "", "a")}
          style={{ minWidth: 150 }}
        />,
        <Select
          options={answerOptions}
          defaultValue={answerStatus ? +answerStatus : ""}
          style={{ minWidth: 120 }}
          onChange={(value) => handleSearch(value + "", "s")}
        />,
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={requestListQuery.isLoading}
          onSearch={(value) => handleSearch(value, "k")}
          style={{ minWidth: 150 }}
          onFocus={(e) => e.target.select()}
        />,
      ]}
      rowKey={"request_id"}
    />
  );
}
