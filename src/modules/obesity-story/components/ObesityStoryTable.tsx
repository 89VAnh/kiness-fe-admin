import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Image, Input, Select, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { BASE_URL, ERROR_TIMEOUT } from "@/constant/config";
import { useSearchObesityStories } from "@/loader/obesity-story.loader";
import { IObesityStory } from "@/models/obesity-story";
import { compareNumbers, compareStrings } from "@/utils/array";
import { formatDateShow } from "@/utils/format-string";

import { draftOptions } from "../data/data-fake";
import ObesityStoryDelete from "./ObesityStoryDelete";
import ObesityStoryModal from "./ObesityStoryModal";

export default function ObesityStoryTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "obesity_story" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchContent, setSearchContent] = useState<string>(
    searchParams.get("k") || "",
  );
  const [draftStatus, setDraftStatus] = useState<string>(
    searchParams.get("d") || "",
  );
  const [page, setPage] = useState<number | string>(
    searchParams.get("page") || 1,
  );
  const [pageSize, setPageSize] = useState<number | string>(
    searchParams.get("page_size") || 10,
  );

  const obesityStoriesQuery = useSearchObesityStories({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
      is_draft: isEmpty(draftStatus) ? null : +draftStatus,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          obesityStoriesQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => obesityStoriesQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obesityStoriesQuery.remove]);

  const handleSearch = (value: string, key = "a") => {
    searchParams.delete("page");
    searchParams.set(key, value);
    switch (key) {
      case "k":
        setSearchContent(value);
        break;
      case "d":
        setDraftStatus(value);
        break;
      default:
        break;
    }

    setSearchParams(searchParams);
    setPage(1);
  };

  const columns: ProColumns<IObesityStory>[] = [
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
      title: t("fields.image_link"),
      dataIndex: "image_link",
      width: 100,
      render: (value) => (
        <Image style={{ maxWidth: 100 }} src={`${BASE_URL}/` + value} />
      ),
    },
    {
      title: t("fields.title"),
      dataIndex: "title",
      sorter: (a: any, b: any) => compareStrings(a, b, "title"),
      width: "25%",
    },
    {
      title: t("fields.author_name"),
      dataIndex: "author_name",
      width: 150,
      sorter: (a: any, b: any) => compareStrings(a, b, "author_name"),
    },
    {
      title: t("fields.posted_date"),
      dataIndex: "posted_date",
      align: "center",
      width: 150,
      sorter: (a: any, b: any) => compareStrings(a, b, "posted_date"),
      render: (value) => {
        // const date = new Date(value?.toString() || "");
        const val = value?.toString();
        return (
          <>{dayjs(val).isValid() ? dayjs(val).format(formatDateShow) : ""}</>
        );
      },
    },
    {
      title: t("fields.view_count"),
      dataIndex: "view_count",
      align: "right",
      width: 80,
      sorter: (a: any, b: any) => compareNumbers(a, b, "view_count"),
    },
    {
      title: t("fields.is_draft.title"),
      dataIndex: "is_draft",
      align: "center",
      sorter: (a: any, b: any) => compareNumbers(a, b, "is_draft"),
      width: 120,
      render: (value: any) => (
        <Tag color={t(`fields.is_draft.${value}.color`)}>
          {t(`fields.is_draft.${value}.label`)}
        </Tag>
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
            <ObesityStoryModal id={record?.obesity_story_id} isCreate={false} />
            <ObesityStoryDelete
              id={record?.obesity_story_id}
              image_path={record?.image_link}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      cardBordered
      loading={obesityStoriesQuery.isLoading}
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
        total: obesityStoriesQuery.data?.total_items || 0,
        showTotal(total, range) {
          return `${range[0]}-${range[1]} trên ${total} câu chuyện`;
        },
      }}
      columns={columns}
      dataSource={obesityStoriesQuery.data?.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [
        <Select
          options={draftOptions}
          defaultValue={draftStatus ? +draftStatus : ""}
          onChange={(value) => handleSearch(value + "", "d")}
          style={{ minWidth: 150 }}
        />,
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={obesityStoriesQuery.isLoading}
          onSearch={(value) => handleSearch(value, "k")}
          style={{ minWidth: 150 }}
          onFocus={(e) => e.target.select()}
        />,
        <ObesityStoryModal />,
      ]}
      rowKey={"obesity_story_id"}
    />
  );
}
