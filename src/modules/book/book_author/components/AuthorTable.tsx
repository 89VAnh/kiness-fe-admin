import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchBookAuthors } from "@/loader/book-author.loader";
import { IBookAuthor } from "@/models/book-author";

import BookAuthorDelete from "./AuthorDelete";
import BookAuthorModal from "./AuthorModal";

export default function BookAuthorTable(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "book.author",
  });
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);
  const [searchContent, setSearchContent] = useState<string | null>();

  const bookAuthorQuery = useSearchBookAuthors({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          bookAuthorQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => bookAuthorQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookAuthorQuery.remove]);

  const handleSearch = (value: string) => {
    setPage(1);
    setSearchContent(value);
  };

  const columns: ProColumns<IBookAuthor>[] = [
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
      dataIndex: "author_name",
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
            <BookAuthorModal id={record?.author_id} isCreate={false} />
            <BookAuthorDelete id={record?.author_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      cardBordered
      loading={bookAuthorQuery.isLoading}
      pagination={{
        pageSize,
        current: page,
        onChange(page, pageSize) {
          setPage(page);
          setPageSize(pageSize);
        },
        total: bookAuthorQuery.data?.data?.total_items || 0,
      }}
      columns={columns}
      dataSource={bookAuthorQuery.data?.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          loading={bookAuthorQuery.isLoading}
          onSearch={handleSearch}
          style={{ minWidth: 150 }}
          onFocus={(e) => e.target.select()}
        />,
        <BookAuthorModal />,
      ]}
      rowKey={"author_id"}
    />
  );
}
