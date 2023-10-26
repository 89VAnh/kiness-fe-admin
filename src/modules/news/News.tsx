import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, Image } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { useSearchNews } from "@/loader/news.loader";

import styles from "./scss/news.module.scss";
import { renderAboutMenus } from "./utils/render";

type NewsModel = {
  news_id: number;
  thumbnail: string;
  news_title: string;
  content: string;
  views: number;
  created_date_time: Date;
  created_user: string;
};

const columns: ProColumns<NewsModel>[] = [
  { dataIndex: "RowNumber", key: "RowNumber", title: "STT" },
  {
    dataIndex: "thumbnail",
    key: "thumbnail",
    title: "Ảnh",
    render: (thumbnail) => <Image src={`${thumbnail}`} preview={false} />,
  },
  { dataIndex: "news_title", key: "news_title", title: "Tiêu đề" },
  { dataIndex: "content", key: "content", title: "Nội dung" },
  { dataIndex: "views", key: "views", title: "Lượt xem", valueType: "digit" },
  {
    dataIndex: "created_date_time",
    key: "created_date_time",
    title: "Ngày tạo",
    valueType: "dateTime",
  },
  { dataIndex: "created_user", key: "created_user", title: "Người tạo" },
  {
    title: "",
    key: "option",
    width: 120,
    valueType: "option",
    render: () => [
      <Button icon={<EditOutlined />}> Edit</Button>,
      <Button danger icon={<DeleteOutlined />}>
        Delete
      </Button>,
    ],
  },
];

export default function News() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [newsIdSelected, setNewsIdSelected] = useState<string>();

  let searchContent = searchParams.get("k") || "";

  const { data, isLoading: isLoadingNews } = useSearchNews({
    params: { search_content: searchContent },
    config: {},
  });

  // Get menus
  const items = renderAboutMenus(t);

  const handleSearch = (value: string) => {
    searchParams.set("k", value);
    setSearchParams(searchParams);
  };

  const handleSelectNews = (id: string) => {
    setNewsIdSelected(id);
  };

  return (
    <ProTable
      columns={columns}
      dataSource={(data ? data.data : []).map((x: NewsModel) => ({
        ...x,
        key: x.news_id,
      }))}
      search={false}
      loading={isLoadingNews}
    />
  );
}
