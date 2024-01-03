import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Select, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchGrowthArticles } from "@/loader/growth-article.loader";
import { IGrowthArticle } from "@/models/growth-article";
import { compareNumbers, compareStrings } from "@/utils/array";
import { formatDateShow } from "@/utils/format-string";

import { draftOptions } from "../data/data-fake";
import GrowthArticleDelete from "./GrowthArticleDelete";
import GrowthArticleModal from "./GrowthArticleModal";

export default function GrowthArticleTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "growth_article" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchContent, setSearchContent] = useState<string>(
    searchParams.get("k") || "",
  );
  const [draftStatus, setDraftStatus] = useState<string>(
    searchParams.get("d") || "",
  );
  const [page, setPage] = useState<number | string>(
    searchParams.get("page") || 1,
  );
  const [pageSize, setPageSize] = useState<number | string>(
    searchParams.get("page_size") || 10,
  );

  const growthArticleListQuery = useSearchGrowthArticles({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: searchContent || null,
      is_draft: isEmpty(draftStatus) ? null : +draftStatus,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          growthArticleListQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => growthArticleListQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [growthArticleListQuery.remove]);

  const handleSearch = (value: string, key = "a") => {
    searchParams.delete("page");
    searchParams.set(key, value);
    switch (key) {
      case "k":
        setSearchContent(value);
        break;
      case "d":
        setDraftStatus(value);
        break;
      default:
        break;
    }

    setSearchParams(searchParams);
    setPage(1);
  };

  const columns: ProColumns<IGrowthArticle>[] = [
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
      title: t("fields.title"),
      dataIndex: "title",
      sorter: (a: any, b: any) => compareStrings(a, b, "title"),
      width: 150,
    },
    {
      title: t("fields.content"),
      dataIndex: "content",
      sorter: (a: any, b: any) => compareStrings(a, b, "content"),
      render: (value) => (
        <Typography.Paragraph
          style={{ maxWidth: "100%" }}
          ellipsis={{ rows: 2 }}
          title={value + ""}
        >
          {value}
        </Typography.Paragraph>
      ),
    },
    {
      title: t("fields.author_name"),
      dataIndex: "author_name",
      width: 150,
      sorter: (a: any, b: any) => compareStrings(a, b, "author_name"),
    },
    {
      title: t("fields.posted_date"),
      dataIndex: "posted_date",
      align: "center",
      width: 150,
      sorter: (a: any, b: any) => compareStrings(a, b, "posted_date"),
      render: (value) => {
        // const date = new Date(value?.toString() || "");
        const val = value?.toString();
        return (
          <>{dayjs(val).isValid() ? dayjs(val).format(formatDateShow) : ""}</>
        );
      },
    },
    {
      title: t("fields.is_draft.title"),
      dataIndex: "is_draft",
      sorter: (a: any, b: any) => compareNumbers(a, b, "is_draft"),
      width: 120,
      render: (value: any) => (
        <Tag color={t(`fields.is_draft.${value}.color`)}>
          {t(`fields.is_draft.${value}.label`)}
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
            <GrowthArticleModal
              id={record?.growth_article_id}
              isCreate={false}
            />
            <GrowthArticleDelete id={record?.growth_article_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Typography.Title level={3}>{t("title")}</Typography.Title>
      <ProTable
        size="small"
        cardBordered
        loading={growthArticleListQuery.isLoading}
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
          total: growthArticleListQuery.data?.data?.total_items || 0,
          showTotal(total, range) {
            return `${range[0]}-${range[1]} trên ${total}`;
          },
        }}
        columns={columns}
        dataSource={growthArticleListQuery.data?.data?.data || []}
        // headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
        search={false}
        toolbar={{
          settings: [],
        }}
        toolBarRender={() => [
          <Select
            options={draftOptions}
            defaultValue={draftStatus ? +draftStatus : ""}
            onChange={(value) => handleSearch(value + "", "d")}
            style={{ minWidth: 150 }}
          />,
          <Input.Search
            placeholder={t("search_placeholder")}
            defaultValue={searchContent}
            loading={growthArticleListQuery.isLoading}
            onSearch={(value) => handleSearch(value, "k")}
            style={{ minWidth: 350 }}
            onFocus={(e) => e.target.select()}
          />,
          <GrowthArticleModal />,
        ]}
        rowKey={"growth_article_id"}
      />
    </>
  );
}
