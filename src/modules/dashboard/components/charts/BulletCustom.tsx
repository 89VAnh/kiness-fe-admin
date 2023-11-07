import { Bullet, BulletConfig } from "@ant-design/plots";

export default function BulletCustom(): JSX.Element {
  const data = [
    {
      title: "",
      ranges: [100],
      measures: [80],
      target: 85,
    },
  ];
  const config: BulletConfig = {
    data,
    measureField: "measures",
    rangeField: "ranges",
    targetField: "target",
    xField: "title",
    color: {
      range: "#f0efff",
      measure: "#1fc5c5",
      target: "#3D76DD",
    },
    xAxis: {
      line: null,
    },
    yAxis: false,
    // 自定义 legend
    legend: false,
  };
  return <Bullet {...config} />;
}
