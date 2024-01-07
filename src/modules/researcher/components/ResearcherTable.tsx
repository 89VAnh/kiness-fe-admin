import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Image, Input, Space, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { BASE_URL, ERROR_TIMEOUT } from "@/constant/config";
import { useSearchResearcher } from "@/loader/researcher.loader";
import { IResearcher } from "@/models/researcher";
import { formatToDate } from "@/utils/format-string";

import ResearcherDelete from "./ResearcherDelete";
import ResearcherModal from "./ResearcherModal";

export default function ResearcherTable(): JSX.Element {
  const { t } = useTranslation("translation", { keyPrefix: "researcher" });
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

  const researchersQuery = useSearchResearcher({
    params: {
      page_index: page,
      page_size: pageSize,
      search_content: isEmpty(searchContent) ? null : searchContent,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          researchersQuery.refetch();
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
    return () => researchersQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [researchersQuery.remove]);

  const columns: ProColumns<IResearcher>[] = [
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
      title: t("fields.name"),
      dataIndex: "name",
      width: 200,
    },

    {
      title: t("fields.degree"),
      dataIndex: "degree",
      width: 100,
    },
    {
      title: t("fields.position"),
      dataIndex: "position_name",
      width: 100,
    },
    {
      title: t("fields.created_date_time"),
      dataIndex: "created_date_time",
      width: 100,
      align: "center",
      valueType: "date",
      render: (_, researcher) => {
        return (
          <Typography.Text>
            {formatToDate(researcher.created_date_time?.toString() || "")}
          </Typography.Text>
        );
      },
    },
    {
      title: t("fields.created_user"),
      dataIndex: "created_user",
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
            <ResearcherModal id={record?.researcher_id} isCreate={false} />
            <ResearcherDelete
              id={record?.researcher_id}
              image_url={record?.image_url || ""}
            />
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
        loading={researchersQuery.isLoading}
        columns={columns}
        dataSource={researchersQuery.data?.data || []}
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
            return `${range[0]}-${range[1]} trên ${total} nhà nghiên cứu`;
          },
          total: researchersQuery.data?.total_items || 0,
        }}
        toolBarRender={() => [
          <Input.Search
            placeholder={t("search_placeholder")}
            defaultValue={searchContent}
            loading={researchersQuery.isLoading}
            onSearch={handleSearch}
            onFocus={(e) => e.target.select()}
          />,
          <ResearcherModal />,
        ]}
        rowKey={"researcher_id"}
      />
    </>
  );
}
