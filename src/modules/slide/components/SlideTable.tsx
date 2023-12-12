import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Image, Input, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchSlides } from "@/loader/slide.loader";
import { ISlide } from "@/models/slide";
import { compareNumbers } from "@/utils/array";

import SlideDelete from "./SlideDelete";
import SlideModal from "./SlideModal";

export default function SlideTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "slide" });
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

  const slidesQuery = useSearchSlides({
    params: {
      pageIndex: page,
      pageSize: pageSize,
      search_content: searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          slidesQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => slidesQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidesQuery.remove]);

  const handleSearch = (value: string) => {
    searchParams.delete("page");
    searchParams.set("k", value);
    setSearchParams(searchParams);

    setPage(1);
    setSearchContent(value);
  };

  const columns: ProColumns<ISlide>[] = [
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
      title: t("fields.image_big"),
      dataIndex: "image_big",
      width: 400,
      render: (value: any) => <Image src={"/api/" + value} width={400} />,
    },
    {
      title: t("fields.image_small"),
      dataIndex: "image_small",
      width: 400,
      render: (value: any) => <Image src={"/api/" + value} width={100} />,
    },
    {
      title: t("fields.caption"),
      dataIndex: "slide_caption",
      width: 200,
    },
    {
      title: t("fields.order"),
      dataIndex: "order",
      align: "right",
      width: 100,
      sorter: (a, b) => compareNumbers(a, b, "order"),
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
            <SlideModal id={record?.slide_id} isCreate={false} />
            <SlideDelete
              id={record?.slide_id}
              filePaths={[record.image_big, record.image_small]}
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
      loading={slidesQuery.isLoading}
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
        total: slidesQuery.data?.totalItems || 0,
      }}
      columns={columns}
      dataSource={slidesQuery.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={slidesQuery.isLoading}
          onSearch={handleSearch}
          onFocus={(e) => e.target.select()}
        />,
        <SlideModal />,
      ]}
      rowKey={"slide_id"}
    />
  );
}
