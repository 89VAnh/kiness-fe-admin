import { ProColumns, ProTable } from "@ant-design/pro-components";
import { DatePicker, Image, Input, Select, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { BASE_URL, ERROR_TIMEOUT } from "@/constant/config";
import { useSearchPostureStories } from "@/loader/posture-story.loader";
import { IPostureStory } from "@/models/posture-story";
import { compareNumbers, compareStrings } from "@/utils/array";
import { formatDatePost, formatDateShow } from "@/utils/format-string";

import { draftOptions } from "../data/data-fake";
import PostureStoryDelete from "./PostureStoryDelete";
import PostureStoryModal from "./PostureStoryModal";

export default function PostureStoryTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "posture_story" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [rangeDate, setRangeDate] = useState<string[]>([]);
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

  const { RangePicker } = DatePicker;

  const postureStoriesQuery = useSearchPostureStories({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
      is_draft: isEmpty(draftStatus) ? null : +draftStatus,
      from_date: rangeDate[0] ? rangeDate[0] : null,
      to_date: rangeDate[1] ? rangeDate[1] : null,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          postureStoriesQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => postureStoriesQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postureStoriesQuery.remove]);

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

  const columns: ProColumns<IPostureStory>[] = [
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
      render: (value) => (
        <Typography.Paragraph ellipsis={{ rows: 2 }}>
          {value}
        </Typography.Paragraph>
      ),
    },
    {
      title: t("fields.author_name"),
      dataIndex: "author_name",
      width: 100,
      sorter: (a: any, b: any) => compareStrings(a, b, "author_name"),
    },
    {
      title: t("fields.posted_date"),
      dataIndex: "posted_date",
      align: "center",
      width: 80,
      sorter: (a: any, b: any) => compareStrings(a, b, "posted_date"),
      render: (value) => {
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
      width: 50,
      sorter: (a: any, b: any) => compareNumbers(a, b, "view_count"),
    },
    {
      title: t("fields.is_draft.title"),
      dataIndex: "is_draft",
      align: "center",
      sorter: (a: any, b: any) => compareNumbers(a, b, "is_draft"),
      width: 100,
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
            <PostureStoryModal id={record?.posture_story_id} isCreate={false} />
            <PostureStoryDelete
              id={record?.posture_story_id}
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
      loading={postureStoriesQuery.isLoading}
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
        total: postureStoriesQuery.data?.total_items || 0,
        showTotal(total, range) {
          return `${range[0]}-${range[1]} trên ${total} câu chuyện`;
        },
      }}
      columns={columns}
      dataSource={postureStoriesQuery.data?.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [
        <RangePicker
          format={formatDateShow}
          style={{ width: 600 }}
          onChange={(range) => {
            setRangeDate(
              range
                ? range.map((x) => (x ? x.format(formatDatePost) : ""))
                : [],
            );
          }}
        />,
        <Select
          options={draftOptions}
          defaultValue={draftStatus ? +draftStatus : ""}
          onChange={(value) => handleSearch(value + "", "d")}
          style={{ minWidth: 150 }}
        />,
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={postureStoriesQuery.isLoading}
          onSearch={(value) => handleSearch(value, "k")}
          style={{ minWidth: 150 }}
          onFocus={(e) => e.target.select()}
        />,
        <PostureStoryModal />,
      ]}
      rowKey={"posture_story_id"}
    />
  );
}
