import { OrganizationGraph } from "@ant-design/graphs";
import { OrganizationGraphData } from "@ant-design/graphs/es/components/organization-graph";
import { useState } from "react";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchDiagrams } from "@/loader/diagram.loader";

import { getOrganTree } from "../data/data-fake";
import styles from "../scss/organ.module.scss";

const initData: OrganizationGraphData = {
  id: "abc",
  value: { name: "Không có dữ liệu" },
};

export default function PreviewOrganization(): JSX.Element {
  const [currentData, setCurrentData] = useState<OrganizationGraphData[]>();

  const diagramsQuery = useSearchDiagrams({
    params: {},
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          diagramsQuery.refetch();
          return;
        }

        if (data.success) {
          const newData = getOrganTree(data?.data?.data);
          setCurrentData(newData);
        }
      },
    },
  });

  return (
    <>
      <section className={styles.contentWrap}>
        <div className="inner">
          <div className={styles.box}>
            <OrganizationGraph
              data={
                diagramsQuery.isLoading
                  ? initData
                  : currentData?.[0] || initData
              }
              loading={diagramsQuery.isLoading}
              autoFit
              fitCenter
              behaviors={[]}
              nodeCfg={{
                style: (node: any) => {
                  return node.id === "1"
                    ? {
                        fill: "#ffba53",
                        stroke: "#ffba53",
                      }
                    : node.parent_id === "1"
                    ? { fill: "#0bc9bd", stroke: "#0bc9bd" }
                    : { stroke: "#0bc9bd" };
                },
                label: {
                  style: (node: any, _, type) => {
                    const styles = {
                      icon: {
                        width: 16,
                        height: 16,
                      },
                      title: {
                        fill: "#fff",
                      },
                      name: {
                        fill: "#fff",
                      },
                    };
                    return node.id === "1"
                      ? styles[type as keyof typeof styles]
                      : node.parent_id === "1"
                      ? styles[type as keyof typeof styles]
                      : {};
                  },
                },
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
