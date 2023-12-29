import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Image, Input, Space, Typography } from "antd";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { BASE_URL, ERROR_TIMEOUT } from "@/constant/config";
import { useSearchBooks } from "@/loader/book.loader";
import { IBook } from "@/models/book";
import { formatDateShow } from "@/utils/format-string";

import BookAuthorModal from "../../book_author/BookAuthorModal";
import BookDelete from "./BookDelete";
import BookModal from "./BookModal";

export default function BookTable(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "book",
  });
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchContent, setSearchContent] = useState<string | null>();

  const bookQuery = useSearchBooks({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          bookQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => bookQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookQuery.remove]);

  const handleSearch = (value: string) => {
    setPage(1);
    setSearchContent(value);
  };

  const columns: ProColumns<IBook>[] = [
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
      title: t("fields.image_url"),
      dataIndex: "image_url",
      width: 100,
      align: "center",
      render: (thumbnail) => (
        <Image src={`${BASE_URL}/` + thumbnail} width={100} />
      ),
    },
    {
      title: t("fields.title"),
      dataIndex: "title",
    },
    {
      title: t("fields.author"),
      dataIndex: "author_name",
    },
    {
      title: t("fields.publication_date"),
      dataIndex: "publication_date",
      render: (date) => (
        <Typography.Text>
          {dayjs(date?.toString()).format(formatDateShow)}
        </Typography.Text>
      ),
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
            <BookModal id={record?.book_id} isCreate={false} />
            <BookDelete id={record?.book_id} />
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
        loading={bookQuery.isLoading}
        pagination={{
          pageSize,
          current: page,
          onChange(page, pageSize) {
            setPage(page);
            setPageSize(pageSize);
          },
          total: bookQuery.data?.data?.total_items || 0,
          showTotal(total, range) {
            return `${range[0]}-${range[1]} trên ${total} sách`;
          },
        }}
        columns={columns}
        dataSource={bookQuery.data?.data?.data || []}
        // headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
        search={false}
        toolbar={{
          settings: [],
        }}
        toolBarRender={() => [
          <Input.Search
            placeholder={t("search_placeholder")}
            loading={bookQuery.isLoading}
            onSearch={handleSearch}
            style={{ minWidth: 350 }}
            onFocus={(e) => e.target.select()}
          />,
          <BookModal />,
          <BookAuthorModal />,
        ]}
        rowKey={"book_id"}
      />
    </>
  );
}
