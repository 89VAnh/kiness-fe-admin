import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Image, Input, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { BASE_URL } from "@/constant/config";
import { useSearchPosition } from "@/loader/position.loader";
import { IPosition } from "@/models/position";
import { formatToDate } from "@/utils/format-string";

import PositionDelete from "./PositionDelete";
import PositionModal from "./PositionModal";

export default function PositionTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "position" });
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

  const position = useSearchPosition({
    params: {
      pageIndex: page,
      pageSize: pageSize,
      search_content: searchContent,
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
    return () => position.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position.remove]);

  const columns: ProColumns<IPosition>[] = [
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
      dataIndex: "position_id",
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
      render: (_, position) => {
        return (
          <Typography.Text>
            {formatToDate(position.created_date_time?.toString() || "")}
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
            <PositionModal id={record?.position_id} isCreate={false} />
            <PositionDelete
              id={record?.position_id}
              thumbnail={record?.thumbnail}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      loading={position.isLoading}
      columns={columns}
      dataSource={position.data?.data || []}
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
        total: position.data?.totalItems || 0,
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={position.isLoading}
          onSearch={handleSearch}
          onFocus={(e) => e.target.select()}
        />,
        <PositionModal />,
      ]}
      rowKey={"position_id"}
    />
  );
}
