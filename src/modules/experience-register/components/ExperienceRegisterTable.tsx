import { FileExcelOutlined } from "@ant-design/icons";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import {
  Button,
  DatePicker,
  Input,
  Space,
  Table,
  TableProps,
  Tag,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import {
  usePrintExperienceRegister,
  useSearchExperienceRegister,
} from "@/loader/experienceRegister.loader";
import { IExperienceRegister } from "@/models/experience_register";
import { printExperienceRegister } from "@/services/experienceRegister.service";
import { UserState } from "@/store/auth/atom";
import { compareNumbers, compareStrings } from "@/utils/array";
import {
  formatDatePost,
  formatDateShow,
  formatToDate,
} from "@/utils/format-string";

import ExperienceRegisterDelete from "./ExperienceRegisterDelete";
import ExperienceRegisterModal from "./ExperienceRegisterModal";

export default function ExperienceRegisterTable(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "experience_register",
  });

  const { RangePicker } = DatePicker;

  const userProfile = useRecoilValue(UserState);
  const [searchContent, setSearchContent] = useState<string>();
  const [rangeDate, setRangeDate] = useState<string[]>([]);

  const experienceRegister = useSearchExperienceRegister({
    params: {
      pageIndex: 1,
      pageSize: 10,
      search_content: searchContent,
      user_id: userProfile.user_id,
      from_date: rangeDate[0] ? rangeDate[0] : null,
      to_date: rangeDate[1] ? rangeDate[1] : null,
    },
  });

  useEffect(() => {
    return () => experienceRegister.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experienceRegister.remove]);

  const handleSearch = (value: string) => {
    // const content = _.join(_.values(params), " ").trim();

    setSearchContent(value);
  };

  // const handleDeleteMulti = (keys: Key[]) => {
  //   deleteCustomer({
  //     list_json: keys.map((key) => ({ customer_id: key as string })),
  //     updated_by_id: userProfile.user_id,
  //   });

  //   message.success(t("message_delete_success"));
  // };

  const rowSelection: TableProps<IExperienceRegister>["rowSelection"] = {
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
    defaultSelectedRowKeys: [],
  };

  const columns = [
    {
      title: t("fields.serial"),
      dataIndex: "RowNumber",
      align: "center",
      width: 50,
      render: (_: any, __: any, index: number) => (
        <Typography.Text>{++index}</Typography.Text>
      ),
      search: false,
    },
    {
      title: t("fields.branch_name"),
      dataIndex: "branch_name",
      sorter: (a: any, b: any) => compareStrings(a, b, "branch_name"),
      width: 200,
    },
    {
      title: t("fields.fullname"),
      dataIndex: "fullname",
      sorter: (a: any, b: any) => compareStrings(a, b, "fullname"),
      width: 200,
    },
    {
      title: t("fields.phone"),
      dataIndex: "phone_number",
      sorter: (a: any, b: any) => compareStrings(a, b, "phone_number"),
      width: 200,
    },
    {
      title: t("fields.gender"),
      dataIndex: "gender",
      sorter: (a: any, b: any) => compareNumbers(a, b, "gender"),
      width: 100,
      render: (value: number) => (
        <Typography.Text>{value === 0 ? "Nam" : "Nữ"}</Typography.Text>
      ),
      search: false,
    },
    {
      title: t("fields.date"),
      dataIndex: "date",
      width: 150,
      align: "center",
      valueType: "date",
      sorter: (a: any, b: any) => compareStrings(a, b, "date"),
      render: (_: any, register: { date: { toString: () => any } }) => (
        <Typography.Text>
          {formatToDate(register.date?.toString() || "")}
        </Typography.Text>
      ),
      search: false,
    },
    {
      title: t("fields.status"),
      dataIndex: "status",
      sorter: (a: any, b: any) => compareNumbers(a, b, "status"),
      width: 200,
      render: (value: any) => (
        <Tag color={t(`status.${value}.color`)}>
          {t(`status.${value}.label`)}
        </Tag>
      ),
    },
    {
      title: t("fields.created_date_time"),
      dataIndex: "created_date_time",
      width: 150,
      align: "center",
      valueType: "created_date_time",
      sorter: (a: any, b: any) => compareStrings(a, b, "created_date_time"),
      render: (
        _: any,
        register: { created_date_time: { toString: () => any } },
      ) => (
        <Typography.Text>
          {formatToDate(register.created_date_time?.toString() || "")}
        </Typography.Text>
      ),
      search: false,
    },
    {
      title: t("fields.actions"),
      dataIndex: "action",
      width: 100,
      align: "center",
      search: false,
      render: (_: any, record: { register_id: number }) => {
        return (
          <Space>
            <ExperienceRegisterModal
              id={record?.register_id}
              isCreate={false}
            />
            <ExperienceRegisterDelete id={record?.register_id} />
          </Space>
        );
      },
    },
  ];

  const print = usePrintExperienceRegister({
    config: {
      onSuccess: () => {
        message.success("Xuất file thành công");
      },
      onError: (res) => {
        message.error(res.message);
      },
    },
  });
  const handlePrint = () => {
    print.mutate({
      search_content: searchContent,
      user_id: userProfile.user_id,
      from_date: rangeDate[0] ? rangeDate[0] : null,
      to_date: rangeDate[1] ? rangeDate[1] : null,
    });
  };

  return (
    <ProTable
      size="small"
      cardBordered
      loading={experienceRegister.isLoading}
      pagination={{
        pageSize: 10,
      }}
      columns={columns as ProColumns<IExperienceRegister>[]}
      dataSource={experienceRegister.data?.data || []}
      headerTitle={<Typography.Title level={3}>{t("title")}</Typography.Title>}
      search={false}
      toolbar={{
        settings: [],
      }}
      toolBarRender={(_, { selectedRowKeys }) => [
        <RangePicker
          format={formatDateShow}
          style={{ width: 460 }}
          onChange={(range) => {
            setRangeDate(
              range
                ? range.map((x) => (x ? x.format(formatDatePost) : ""))
                : [],
            );
          }}
        />,
        <Input.Search
          placeholder={t("search_placeholder")}
          loading={experienceRegister.isLoading}
          onSearch={handleSearch}
          onFocus={(e) => e.target.select()}
        />,
        <Button
          type="primary"
          icon={<FileExcelOutlined />}
          onClick={handlePrint}
          disabled={
            experienceRegister.isLoading ||
            [...experienceRegister.data.data].length == 0
          }
        >
          Xuất file
        </Button>,
      ]}
      rowKey={"register_id"}
    />
  );
}
