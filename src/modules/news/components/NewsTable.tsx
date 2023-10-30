import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Image, Space, Table, Typography } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import { useSearchNews } from "@/loader/news.loader";
import { INews } from "@/models/news";
import { UserState } from "@/store/auth/atom";
import { formatToDate } from "@/utils/format-string";

import NewsDelete from "./NewsDelete";
import NewsModal from "./NewsModal";

export default function NewsTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "news" });
  const userProfile = useRecoilValue(UserState);
  const news = useSearchNews({
    params: {
      pageIndex: 1,
      pageSize: 10,
    },
  });

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
      title: t("fields.id"),
      dataIndex: "news_id",
      width: 100,
    },
    {
      title: t("fields.thumbnail"),
      dataIndex: "thumbnail",
      width: 100,
      render: (thumbnail) => <Image src={`${thumbnail}`} preview={false} />,
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
            {formatToDate(news.created_date_time.toString() || "")}
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
            <NewsDelete id={record?.news_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        defaultSelectedRowKeys: [],
      }}
      loading={news.isLoading}
      pagination={{
        pageSize: 10,
      }}
      columns={columns}
      dataSource={news.data?.data || []}
      headerTitle={t("title")}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [<NewsModal />]}
      rowKey={"news_id"}
    />
  );
}
