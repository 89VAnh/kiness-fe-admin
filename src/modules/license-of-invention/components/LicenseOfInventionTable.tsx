import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Image, Input, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { BASE_URL, ERROR_TIMEOUT } from "@/constant/config";
import { useSearchLicenses } from "@/loader/license-of-invention.loader";
import { ILicenseOfInvention } from "@/models/license-of-invention";

import LicenseDelete from "./LicenseOfInventionDelete";
import LicenseModal from "./LicenseOfInventionModal";

export default function LicenseTable(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "license_of_invention",
  });
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

  const licensesQuery = useSearchLicenses({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          licensesQuery.refetch();
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
    return () => licensesQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [licensesQuery.remove]);

  const columns: ProColumns<ILicenseOfInvention>[] = [
    {
      title: t("fields.serial"),
      dataIndex: "serial",
      align: "center",
      width: 50,
      render: (_, __, index) => <Typography.Text>{++index}</Typography.Text>,
      search: false,
    },
    {
      title: t("fields.image_url"),
      dataIndex: "image_url",
      width: 100,
      align: "center",
      // render: (image_url) => <Image src={"/api/" + image_url} width={100} />,
      render: (image_url) => (
        <Image src={BASE_URL + "/" + image_url} width={100} />
      ),
      search: false,
    },
    {
      title: t("fields.title"),
      dataIndex: "title",
      width: 200,
    },
    {
      title: t("fields.license_no"),
      dataIndex: "license_no",
      width: 100,
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
            <LicenseModal id={record?.license_id} isCreate={false} />
            <LicenseDelete
              id={record?.license_id}
              image_url={record?.image_url!}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable
      size="small"
      loading={licensesQuery.isLoading}
      columns={columns}
      dataSource={licensesQuery.data ? licensesQuery.data?.data?.data : []}
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
        total: licensesQuery.data?.total_items || 0,
      }}
      toolBarRender={() => [
        <Input.Search
          placeholder={t("search_placeholder")}
          defaultValue={searchContent}
          loading={licensesQuery.isLoading}
          onSearch={handleSearch}
          onFocus={(e) => e.target.select()}
        />,
        <LicenseModal />,
      ]}
      rowKey={"license_id"}
    />
  );
}
