import { Column, ColumnConfig } from "@ant-design/plots";
import { useToken } from "@ant-design/pro-components";
import { useState } from "react";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useStatisticExperience } from "@/loader/dashboard.loader";

export default function ColumnBasic(): JSX.Element {
  const token = useToken();
  const [data, setData] = useState<any[]>([]);

  const statisticQuery = useStatisticExperience({
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          statisticQuery.refetch();
          return;
        }

        if (data.length > 0) {
          const dataTransformed = data.map((item: any) => ({
            value: item.number,
            type: `${item.day}/${item.month}/${item.year}`,
          }));

          setData(dataTransformed);

          // if (dataTransformed.length === 7) {
          //   setData(dataTransformed);
          //   return;
          // }

          // const initData = [...Array(7)].map((_, index) => ({
          //   value: 0,
          //   type: dayjs().subtract(index, "day").format(formatDateShow),
          // }));

          // const dataDiff = _.differenceBy(initData, dataTransformed, "type");

          // setData(_.sortBy([...dataDiff, ...dataTransformed], "type"));
        }
      },
    },
  });

  const config: ColumnConfig = {
    data,
    xField: "type",
    yField: "value",
    height: 400,
    style: {
      fill: token.token.colorPrimary,
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: "inside",
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
