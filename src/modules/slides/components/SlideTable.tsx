import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Image, Input, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { useSearchSlides } from "@/loader/slides.loader";
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

  const customers = useSearchSlides({
    params: {
      pageIndex: page,
      pageSize: pageSize,
      search_content: searchContent,
    },
  });

  useEffect(() => {
    return () => customers.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customers.remove]);

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
      title: t("fields.image"),
      dataIndex: "image",
      width: 400,
      render: (value: any) => <Image src={"/api/" + value} width={100} />,
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
            <SlideDelete id={record?.slide_id} filePath={record.image} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      cardBordered
      loading={customers.isLoading}
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
        total: customers.data?.totalItems || 0,
      }}
      columns={columns}
      dataSource={customers.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={customers.isLoading}
          onSearch={handleSearch}
          onFocus={(e) => e.target.select()}
        />,
        <SlideModal />,
      ]}
      rowKey={"slide_id"}
    />
  );
}
