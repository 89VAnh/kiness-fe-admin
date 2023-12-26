import { Typography } from "antd";

import ColumnBasic from "./components/charts/ColumnBasic";
import StatisticCard from "./components/statistic-card/StatisticCard";

export default function Dashboard(): JSX.Element {
  return (
    <>
      <StatisticCard />

      <Typography.Title level={3}>
        Thống kê lượt đăng ký trải nghiệm
      </Typography.Title>
      <ColumnBasic />
    </>
  );
}
