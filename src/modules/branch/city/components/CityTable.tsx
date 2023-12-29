import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchCities } from "@/loader/city.loader";
import { ICity } from "@/models/city";
import { compareNumbers } from "@/utils/array";

import CityDelete from "./CityDelete";
import CityModal from "./CityModal";

export default function CityTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "city" });
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

  const citiesQuery = useSearchCities({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          citiesQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => citiesQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesQuery.remove]);

  const handleSearch = (value: string) => {
    searchParams.delete("page");
    searchParams.set("k", value);
    setSearchParams(searchParams);

    setPage(1);
    setSearchContent(value);
  };

  const columns: ProColumns<ICity>[] = [
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
      title: t("fields.city_name"),
      dataIndex: "city_name",
      width: 100,
      sorter: (a, b) => compareNumbers(a, b, "city_name"),
    },
    {
      title: t("fields.code"),
      dataIndex: "code",
      width: 100,
      sorter: (a, b) => compareNumbers(a, b, "code"),
    },
    {
      title: t("fields.actions"),
      dataIndex: "action",
      width: 25,
      align: "center",
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <CityModal id={record?.city_id} isCreate={false} />
            <CityDelete id={record?.city_id} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      loading={citiesQuery.isLoading}
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
        total: citiesQuery.data?.total_items || 0,
        showTotal(total, range) {
          return `${range[0]}-${range[1]} trên ${total} khu vực`;
        },
      }}
      columns={columns}
      dataSource={citiesQuery.data?.data || []}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={citiesQuery.isLoading}
          onSearch={handleSearch}
          onFocus={(e) => e.target.select()}
        />,
        <CityModal />,
      ]}
      rowKey={"city_id"}
    />
  );
}
