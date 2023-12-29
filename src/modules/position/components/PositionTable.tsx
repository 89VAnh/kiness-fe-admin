import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ERROR_TIMEOUT } from "@/constant/config";
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

  const positionsQuery = useSearchPosition({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          positionsQuery.refetch();
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
    return () => positionsQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionsQuery.remove]);

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
      title: t("fields.position_name"),
      dataIndex: "position_name",
      width: 150,
    },
    {
      title: t("fields.description"),
      dataIndex: "description",
      width: 150,
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
            <PositionDelete id={record?.position_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Typography.Title level={3}>{t("title")}</Typography.Title>
      <ProTable
        size="small"
        loading={positionsQuery.isLoading}
        columns={columns}
        dataSource={positionsQuery.data?.data || []}
        // headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
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
            return `${range[0]}-${range[1]} trên ${total} chức vụ`;
          },
          total: positionsQuery.data?.total_items || 0,
        }}
        toolBarRender={() => [
          <Input.Search
            placeholder={t("search_placeholder")}
            defaultValue={searchContent}
            loading={positionsQuery.isLoading}
            onSearch={handleSearch}
            onFocus={(e) => e.target.select()}
          />,
          <PositionModal />,
        ]}
        rowKey={"position_id"}
      />
    </>
  );
}
