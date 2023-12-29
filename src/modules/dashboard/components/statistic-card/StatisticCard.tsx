import { Col, Row, Skeleton, Typography } from "antd";
import _ from "lodash";
import { FunctionComponent, SVGProps, useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { ACCESSES } from "@/constant/access";
import { ERROR_TIMEOUT } from "@/constant/config";
import {
  useGetCountBranch,
  useGetCountEmployee,
  useGetCountExperienceRegister,
  useGetCountRequest,
} from "@/loader/dashboard.loader";
import { UserState } from "@/store/auth/atom";

import { colorStatistic } from "./data/data";
import styles from "./scss/statistic.module.scss";

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
        if (typeof data.total === "number")
          setCurrentData((prev) => ({ ...prev, branch: data.total }));
      },
    },
  });

  const countExperienceQuery = useGetCountExperienceRegister({
    user_id: userProfile.user_id,
    config: {
      onSuccess(data) {
        if (data.message === ERROR_TIMEOUT) countExperienceQuery.refetch();
        if (typeof data.total === "number")
          setCurrentData((prev) => ({
            ...prev,
            experience: data.total,
          }));
      },
    },
  });

  const countEmployeeQuery = useGetCountEmployee({
    user_id: userProfile.user_id,
    config: {
      onSuccess(data) {
        if (data.message === ERROR_TIMEOUT) {
          countEmployeeQuery.refetch();
          return;
        }
        if (
          typeof data.total === "number" &&
          userProfile.position_name.toLowerCase() !== ACCESSES.POS_EMPLOYEE &&
          userProfile.position_name.toLowerCase() !== ACCESSES.POS_CUSTOMER
        )
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
      style={{ marginTop: 16, marginBottom: 37 }}
    >
      {currentData
        ? colorStatistic?.map((item) => (
            <Col
              key={item.key}
              style={{
                width: _.keys(currentData).length <= 4 ? "25%" : "33.333333%",
              }}
            >
              <Link preventScrollReset to={item?.linkTo}>
                <div className={styles.statistic_card}>
                  <div style={{ paddingRight: 8 }}>
                    <Typography.Title
                      level={1}
                      className={styles.value}
                      style={{
                        color: item.color,
                      }}
                    >
                      <CountUp
                        start={0}
                        end={currentData[item.key as keyof typeof currentData]}
                        duration={0.8}
                        decimal=","
                      />
                    </Typography.Title>
                    <Typography.Title
                      level={3}
                      className={styles.title}
                      style={{
                        color: item?.color,
                      }}
                    >
                      {t("dashboard." + item?.title)}
                    </Typography.Title>
                  </div>
                  <div>{renderIcon(item?.icon)}</div>
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
