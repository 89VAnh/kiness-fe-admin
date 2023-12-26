import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchResearchArticle } from "@/loader/research-article.loader";
import { IResearchArticle } from "@/models/research-article";

import AuthorManageModal from "../../article-author/AuthorManageModal";
import ResearchArticleDelete from "./ResearchArticleDelete";
import ResearchArticleModal from "./ResearchArticleModal";

export default function ResearchArticleTable(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "research_article",
  });
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

  const researchArticleQuery = useSearchResearchArticle({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          researchArticleQuery.refetch();
        }
      },
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
    return () => researchArticleQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [researchArticleQuery.remove]);

  const columns: ProColumns<IResearchArticle>[] = [
    {
      title: t("fields.serial"),
      dataIndex: "serial",
      align: "center",
      width: 5,
      render: (_, __, index) => <Typography.Text>{++index}</Typography.Text>,
      search: false,
    },
    {
      title: t("fields.title"),
      dataIndex: "title",
      width: 250,
      render: (text) => (
        <Typography.Paragraph ellipsis={{ rows: 2 }}>
          {text}
        </Typography.Paragraph>
      ),
    },
    {
      title: t("fields.authors"),
      dataIndex: "authors",
      width: 100,
      render: (text) => (
        <Typography.Paragraph ellipsis={{ rows: 2 }}>
          {text}
        </Typography.Paragraph>
      ),
    },

    {
      title: t("fields.issuers"),
      dataIndex: "issuers",
      width: 150,
      render: (text) => (
        <Typography.Paragraph ellipsis={{ rows: 2 }}>
          {text}
        </Typography.Paragraph>
      ),
    },
    {
      title: t("fields.year_of_release"),
      dataIndex: "year_of_release",
      align: "right",
      width: 30,
    },
    {
      title: t("fields.actions"),
      dataIndex: "action",
      width: 30,
      align: "center",
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <ResearchArticleModal id={record?.article_id} isCreate={false} />
            <ResearchArticleDelete id={record?.article_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      loading={researchArticleQuery.isLoading}
      columns={columns}
      dataSource={researchArticleQuery.data?.data || []}
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
        total: researchArticleQuery.data?.total_items || 0,
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={researchArticleQuery.isLoading}
          onSearch={handleSearch}
          onFocus={(e) => e.target.select()}
        />,
        <ResearchArticleModal />,
        <AuthorManageModal />,
      ]}
      rowKey={"researchArticleQuery_id"}
    />
  );
}
