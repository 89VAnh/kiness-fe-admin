import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchArticleAuthor } from "@/loader/article-author.loader";
import { IArticleAuthor } from "@/models/article-author";

import ArticleAuthorDelete from "./AuthorDelete";
import ArticleAuthorModal from "./AuthorModal";

export default function ArticleAuthorTable(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "research_article.author",
  });
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchContent, setSearchContent] = useState<string | null>();

  const articleAuthorQuery = useSearchArticleAuthor({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          articleAuthorQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => articleAuthorQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleAuthorQuery.remove]);

  const handleSearch = (value: string) => {
    setPage(1);
    setSearchContent(value);
  };

  const columns: ProColumns<IArticleAuthor>[] = [
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
      title: t("fields.name"),
      dataIndex: "name",
    },
    {
      title: t("fields.actions"),
      dataIndex: "actions",
      width: 70,
      align: "center",
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <ArticleAuthorModal id={record?.author_id} isCreate={false} />
            <ArticleAuthorDelete id={record?.author_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      cardBordered
      loading={articleAuthorQuery.isLoading}
      pagination={{
        pageSize,
        current: page,
        onChange(page, pageSize) {
          setPage(page);
          setPageSize(pageSize);
        },
        total: articleAuthorQuery.data?.total_items || 0,
      }}
      columns={columns}
      dataSource={articleAuthorQuery.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          loading={articleAuthorQuery.isLoading}
          onSearch={handleSearch}
          style={{ minWidth: 150 }}
          onFocus={(e) => e.target.select()}
        />,
        <ArticleAuthorModal />,
      ]}
      rowKey={"author_id"}
    />
  );
}
