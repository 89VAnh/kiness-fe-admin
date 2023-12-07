import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useSearchFaqTopics } from "@/loader/faq-topic.loader";
import { IFaqTopic } from "@/models/faq-topic";

import TopicFaqDelete from "./TopicFaqDelete";
import TopicFaqModal from "./TopicFaqModal";

export default function TopicFaqTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "faq.topic" });
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchContent, setSearchContent] = useState<string | null>();

  const topicQuery = useSearchFaqTopics({
    params: {
      pageIndex: page,
      pageSize: pageSize,
      search_content: searchContent,
    },
  });

  useEffect(() => {
    return () => topicQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicQuery.remove]);

  const handleSearch = (value: string) => {
    setPage(1);
    setSearchContent(value);
  };

  const columns: ProColumns<IFaqTopic>[] = [
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
            <TopicFaqModal id={record?.topic_id} isCreate={false} />
            <TopicFaqDelete id={record?.topic_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      cardBordered
      loading={topicQuery.isLoading}
      pagination={{
        pageSize,
        current: page,
        onChange(page, pageSize) {
          setPage(page);
          setPageSize(pageSize);
        },
        total: topicQuery.data?.totalItems || 0,
      }}
      columns={columns}
      dataSource={topicQuery.data?.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          loading={topicQuery.isLoading}
          onSearch={handleSearch}
          style={{ minWidth: 150 }}
          onFocus={(e) => e.target.select()}
        />,
        <TopicFaqModal />,
      ]}
      rowKey={"topic_id"}
    />
  );
}
