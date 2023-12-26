import { Column, ColumnConfig } from "@ant-design/plots";
import { useToken } from "@ant-design/pro-components";
import dayjs from "dayjs";
import _ from "lodash";
import { useState } from "react";

import { formatDateShow } from "@/utils/format-string";

export default function ColumnBasic(): JSX.Element {
  const token = useToken();
  const [data] = useState(() =>
    _.sortBy(
      [...Array(10)].map((_, index) => ({
        id: index,
        type: dayjs()
          .subtract(index + 1, "day")
          .format(formatDateShow),
        value: Math.floor(Math.random() * 100),
      })),
      "type",
    ),
  );

  const config: ColumnConfig = {
    data,
    xField: "type",
    yField: "value",
    style: {
      fill: token.token.colorPrimary,
    },
    label: {
      // 可手动配置 label 数据标签位置
      // position: "inside",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        fontWeight: "bold",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return <Column {...config} />;
}
