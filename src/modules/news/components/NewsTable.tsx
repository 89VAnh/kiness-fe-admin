import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Image, Input, Space, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { BASE_URL } from "@/constant/config";
import { useSearchNews } from "@/loader/news.loader";
import { INews } from "@/models/news";
import { formatToDate } from "@/utils/format-string";

import NewsDelete from "./NewsDelete";
import NewsModal from "./NewsModal";

export default function NewsTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "news" });
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

  const news = useSearchNews({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
    },
  });
  const handleSearch = (value: string) => {
    searchParams.delete("page");
    searchParams.set("k", value);
    setSearchParams(searchParams);
    setPage(1);
    setSearchContent(value);
  };

  useEffect(() => {
    return () => news.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [news.remove]);

  const columns: ProColumns<INews>[] = [
    {
      title: t("fields.serial"),
      dataIndex: "serial",
      align: "center",
      width: 50,
      render: (_, __, index) => <Typography.Text>{++index}</Typography.Text>,
      search: false,
    },
    {
      title: t("fields.thumbnail"),
      dataIndex: "thumbnail",
      width: 100,
      align: "center",
      // render: (thumbnail) => <Image src={"/api/" + thumbnail} width={100} />,
      render: (thumbnail) => (
        <Image src={BASE_URL + "/" + thumbnail} width={100} />
      ),
      search: false,
    },
    {
      title: t("fields.title"),
      dataIndex: "news_title",
      width: 300,
    },

    {
      title: t("fields.views"),
      dataIndex: "views",
      width: 150,
      align: "center",
      search: false,
    },
    {
      title: t("fields.created_date_time"),
      dataIndex: "created_date_time",
      width: 200,
      align: "center",
      valueType: "date",
      render: (_, news) => {
        return (
          <Typography.Text>
            {formatToDate(news.created_date_time?.toString() || "")}
          </Typography.Text>
        );
      },
    },
    {
      title: t("fields.created_user"),
      dataIndex: "created_user",
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
            <NewsModal id={record?.news_id} isCreate={false} />
            <NewsDelete id={record?.news_id} thumbnail={record?.thumbnail} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      loading={news.isLoading}
      columns={columns}
      dataSource={news.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
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
        total: news.data?.total_items || 0,
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={news.isLoading}
          onSearch={handleSearch}
          onFocus={(e) => e.target.select()}
        />,
        <NewsModal />,
      ]}
      rowKey={"news_id"}
    />
  );
}
