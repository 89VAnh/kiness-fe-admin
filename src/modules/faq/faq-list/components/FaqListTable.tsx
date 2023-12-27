import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchFaqs } from "@/loader/faq.loader";
import { IFaq } from "@/models/faq";

import TopicFaqModal from "../../topic-faq/TopicFaqModal";
import FaqListDelete from "./FaqListDelete";
import FaqListModal from "./FaqListModal";

export default function FaqListTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "faq.list" });
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

  const faqListQuery = useSearchFaqs({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          faqListQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => faqListQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqListQuery.remove]);

  const handleSearch = (value: string) => {
    searchParams.delete("page");
    searchParams.set("k", value);
    setSearchParams(searchParams);

    setPage(1);
    setSearchContent(value);
  };

  const columns: ProColumns<IFaq>[] = [
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
      title: t("fields.topic_name"),
      dataIndex: "topic_name",
      width: 100,
      render: (value) => (
        <Typography.Paragraph ellipsis={{ rows: 2 }} title={value + ""}>
          {value}
        </Typography.Paragraph>
      ),
    },
    {
      title: t("fields.question"),
      dataIndex: "question",
      width: 200,
      render: (value) => (
        <Typography.Paragraph ellipsis={{ rows: 2 }} title={value + ""}>
          {value}
        </Typography.Paragraph>
      ),
    },
    {
      title: t("fields.answer"),
      dataIndex: "answer",
      width: 250,
      render: (value) => (
        <Typography.Paragraph ellipsis={{ rows: 2 }} title={value + ""}>
          {value}
        </Typography.Paragraph>
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
            <FaqListModal id={record?.faq_id} isCreate={false} />
            <FaqListDelete id={record?.faq_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      cardBordered
      loading={faqListQuery.isLoading}
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
        total: faqListQuery?.data?.data?.total_items || 0,
        showTotal: (total, range) => {
          return `${range[0]}-${range[1]} trong số ${total} câu hỏi`;
        },
      }}
      columns={columns}
      dataSource={faqListQuery.data?.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={faqListQuery.isLoading}
          onSearch={handleSearch}
          style={{ minWidth: 350 }}
          onFocus={(e) => e.target.select()}
        />,
        <FaqListModal />,
        <TopicFaqModal />,
      ]}
      rowKey={"faq_id"}
    />
  );
}
