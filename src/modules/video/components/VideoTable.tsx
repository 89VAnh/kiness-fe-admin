import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchVideos } from "@/loader/video.loader";
import { IVideo } from "@/models/video";
import { extractVideoId } from "@/utils/format-string";

import VideoDelete from "./VideoDelete";
import VideoModal from "./VideoModal";

export default function VideoTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "video" });
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

  const videosQuery = useSearchVideos({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          videosQuery.refetch();
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
    return () => videosQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videosQuery.remove]);

  const columns: ProColumns<IVideo>[] = [
    {
      title: t("fields.serial"),
      dataIndex: "serial",
      align: "center",
      width: 50,
      render: (_, __, index) => <Typography.Text>{++index}</Typography.Text>,
      search: false,
    },
    {
      title: t("fields.video_name"),
      dataIndex: "video_name",
      width: 150,
    },
    {
      title: t("fields.video_link"),
      dataIndex: "video_link",
      width: 250,
      render: (value) => {
        const data = value?.toString();

        return (
          <iframe
            width="250"
            height={100}
            src={`https://www.youtube.com/embed/${extractVideoId(
              data + "",
            )}?autoplay=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            frameBorder={0}
            allowFullScreen
          ></iframe>
        );
      },
    },
    {
      title: t("fields.is_foreign"),
      dataIndex: "is_foreign",
      width: 200,
      align: "center",
      render: (value) =>
        value?.toString() === "0" ? t("fields.local") : t("fields.world"),
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
            <VideoModal id={record?.video_id} isCreate={false} />
            <VideoDelete id={record?.video_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      loading={videosQuery.isLoading}
      columns={columns}
      dataSource={videosQuery.data?.data?.data || []}
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
        total: videosQuery.data?.total_items || 0,
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={videosQuery.isLoading}
          onSearch={handleSearch}
          onFocus={(e) => e.target.select()}
        />,
        <VideoModal />,
      ]}
      rowKey={"video_id"}
    />
  );
}
