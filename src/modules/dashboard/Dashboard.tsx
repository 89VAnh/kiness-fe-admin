import { Card, Typography } from "antd";

import ColumnBasic from "./components/charts/ColumnBasic";
import StatisticCard from "./components/statistic-card/StatisticCard";

export default function Dashboard(): JSX.Element {
  return (
    <>
      <StatisticCard />

      <Card style={{ boxShadow: "0px 0px 4px 0px #00000040" }}>
        <Typography.Title level={3}>
          Thống kê lượt đăng ký trải nghiệm
        </Typography.Title>
        <ColumnBasic />
      </Card>
    </>
  );
}
