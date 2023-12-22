import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Input, Space, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchBranches } from "@/loader/branch.loader";
import { IBranch } from "@/models/branch";
import { compareNumbers } from "@/utils/array";

import BranchDelete from "./BranchDelete";
import BranchModal from "./BranchModal";

export default function BranchTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "branch" });
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

  const branchesQuery = useSearchBranches({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          branchesQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => branchesQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchesQuery.remove]);

  const handleSearch = (value: string) => {
    searchParams.delete("page");
    searchParams.set("k", value);
    setSearchParams(searchParams);

    setPage(1);
    setSearchContent(value);
  };

  const columns: ProColumns<IBranch>[] = [
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
    // {
    //   title: t("fields.thumbnail"),
    //   dataIndex: "thumbnail",
    //   width: 100,
    //   render: (value: any) => <Image src={"/api/" + value} width={100} />,
    // },
    {
      title: t("fields.branch_name"),
      dataIndex: "branch_name",
      width: 100,
      sorter: (a, b) => compareNumbers(a, b, "branch_name"),
    },
    {
      title: t("fields.phone"),
      dataIndex: "phone",
      width: 100,
      sorter: (a, b) => compareNumbers(a, b, "phone"),
    },
    {
      title: t("fields.city_name"),
      dataIndex: "city_name",
      width: 100,
      sorter: (a, b) => compareNumbers(a, b, "city_name"),
    },
    {
      title: t("fields.address"),
      dataIndex: "address",
      width: 200,
      sorter: (a, b) => compareNumbers(a, b, "address"),
    },
    {
      title: t("fields.open_time"),
      dataIndex: "open_time",
      width: 150,
      sorter: (a, b) => compareNumbers(a, b, "open_time"),
    },
    {
      title: t("fields.close_time"),
      dataIndex: "close_time",
      width: 100,
      sorter: (a, b) => compareNumbers(a, b, "close_time"),
    },
    // {
    //   title: t("fields.embed_map"),
    //   dataIndex: "embed_map",
    //   width: 100,
    //   sorter: (a, b) => compareNumbers(a, b, "embed_map"),
    // },
    {
      title: t("fields.actions"),
      dataIndex: "action",
      align: "center",
      search: false,
      width: 50,
      render: (_, record) => {
        return (
          <Space>
            <BranchModal id={record?.branch_id} isCreate={false} />
            <BranchDelete id={record?.branch_id} thumbnail={record.thumbnail} />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      cardBordered
      loading={branchesQuery.isLoading}
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
        total: branchesQuery.data?.total_items || 0,
      }}
      columns={columns}
      dataSource={branchesQuery.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={branchesQuery.isLoading}
          onSearch={handleSearch}
          onFocus={(e) => e.target.select()}
        />,
        <BranchModal />,
      ]}
      rowKey={"branch_id"}
    />
  );
}
