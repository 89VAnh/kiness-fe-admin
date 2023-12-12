import { Col, Row, Skeleton, Typography } from "antd";
import _ from "lodash";
import { FunctionComponent, SVGProps, useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { ERROR_TIMEOUT } from "@/constant/config";
import {
  useGetCountBranch,
  useGetCountEmployee,
  useGetCountExperienceRegister,
  useGetCountRequest,
} from "@/loader/dashboard.loader";
import { UserState } from "@/store/auth/atom";

import { colorStatistic } from "./data/data";
import styles from "./styles/statistic.module.scss";

export default function StatisticDash(): JSX.Element {
  const { t } = useTranslation();
  const [currentData, setCurrentData] = useState({});
  const userProfile = useRecoilValue(UserState);

  const renderIcon = (Icon: FunctionComponent<SVGProps<SVGSVGElement>>) => {
    return <Icon />;
  };

  const countBranchQuery = useGetCountBranch({
    user_id: userProfile.user_id,
    config: {
      onSuccess(data) {
        if (data.message === ERROR_TIMEOUT) countBranchQuery.refetch();
        if (data.total)
          setCurrentData((prev) => ({ ...prev, branch: data.total }));
      },
    },
  });

  const countExperienceQuery = useGetCountExperienceRegister({
    user_id: userProfile.user_id,
    config: {
      onSuccess(data) {
        if (data.message === ERROR_TIMEOUT) countExperienceQuery.refetch();
        if (data.total)
          setCurrentData((prev) => ({
            ...prev,
            experience: data.total?.total,
          }));
      },
    },
  });

  const countEmployeeQuery = useGetCountEmployee({
    user_id: userProfile.user_id,
    config: {
      onSuccess(data) {
        if (data.message === ERROR_TIMEOUT) countEmployeeQuery.refetch();
        if (data.total && userProfile.position_id === 2)
          setCurrentData((prev) => ({ ...prev, employee: data.total }));
      },
    },
  });

  const countRequestQuery = useGetCountRequest({
    config: {
      onSuccess(data) {
        if (data.message === ERROR_TIMEOUT) countRequestQuery.refetch();
        if (typeof data.total === "number")
          setCurrentData((prev) => ({ ...prev, request: data.total }));
      },
    },
  });

  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      style={{ margin: "0 4px", marginTop: 16, marginBottom: 37 }}
    >
      {currentData
        ? Object?.entries(currentData || {})?.map((item) => (
            <Col
              key={item?.[0]}
              style={{
                width: _.keys(currentData).length <= 4 ? "25%" : "33.333333%",
              }}
            >
              <Link
                preventScrollReset
                to={
                  colorStatistic[item?.[0] as keyof typeof colorStatistic]
                    ?.linkTo
                }
              >
                <div className={styles.statistic_card}>
                  <div style={{ paddingRight: 8 }}>
                    <Typography.Title
                      level={1}
                      className={styles.value}
                      style={{
                        color:
                          colorStatistic[
                            item?.[0] as keyof typeof colorStatistic
                          ]?.color,
                      }}
                    >
                      <CountUp
                        start={0}
                        end={Number(item?.[1] || 0)}
                        duration={0.8}
                        decimal=","
                      />
                    </Typography.Title>
                    <Typography.Title
                      level={3}
                      className={styles.title}
                      style={{
                        color:
                          colorStatistic[
                            item?.[0] as keyof typeof colorStatistic
                          ]?.color,
                      }}
                    >
                      {t(
                        "dashboard." +
                          colorStatistic[
                            item?.[0] as keyof typeof colorStatistic
                          ]?.title,
                      )}
                    </Typography.Title>
                  </div>
                  <div>
                    {renderIcon(
                      colorStatistic[item?.[0] as keyof typeof colorStatistic]
                        ?.icon,
                    )}
                  </div>
                </div>
              </Link>
            </Col>
          ))
        : [...Array(5)].map((_, index) => (
            <Col key={index} style={{ width: "20%" }}>
              <div className={styles.statistic_card}>
                <div style={{ paddingRight: 8 }}>
                  <Skeleton.Button style={{ width: 200, height: 50 }} active />
                  <br />
                  <br />
                  <Skeleton.Input active />
                </div>
                <div>
                  <Skeleton.Avatar active />
                </div>
              </div>
            </Col>
          ))}
    </Row>
  );
}
