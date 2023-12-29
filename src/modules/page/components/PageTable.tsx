import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { useSearchPages } from "@/loader/page.loader";
import { IPage } from "@/models/page";
import { compareStrings } from "@/utils/array";

import PageDelete from "./PageDelete";
import PageModal from "./PageModal";

export default function PageTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "page" });
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

  const customers = useSearchPages({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
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

  const columns: ProColumns<IPage>[] = [
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
      title: t("fields.code"),
      dataIndex: "page_code",
      sorter: (a, b) => compareStrings(a, b, "page_code"),
      width: 100,
    },
    {
      title: t("fields.title"),
      dataIndex: "page_title",
      sorter: (a, b) => compareStrings(a, b, "page_title"),
      width: 400,
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
            <PageModal id={record?.page_code} isCreate={false} />
            <PageDelete id={record?.page_id} />
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
        cardBordered
        // rowSelection={{
        //   selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        //   defaultSelectedRowKeys: [],
        // }}
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
          total: customers.data?.total_items || 0,
          showTotal(total, range) {
            return `${range[0]}-${range[1]} trên ${total} trang`;
          },
        }}
        columns={columns}
        dataSource={customers.data?.data || []}
        // headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
        // search={{
        //   resetText: "Reset",
        //   labelWidth: "auto",
        // }}
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
          <PageModal />,
        ]}
        rowKey={"page_id"}
      />
    </>
  );
}
