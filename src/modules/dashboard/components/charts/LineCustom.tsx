import { Line, LineConfig } from "@ant-design/plots";
import { useEffect, useState } from "react";

export default function LineCustom(): JSX.Element {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json",
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config: LineConfig = {
    data,
    xField: "year",
    yField: "gdp",
    seriesField: "name",
    yAxis: false,
    xAxis: false,
    legend: false,
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  return <Line {...config} />;
}
