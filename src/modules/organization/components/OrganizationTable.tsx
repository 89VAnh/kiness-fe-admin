import { Button, Col, Input, Row, Tree } from "antd";
import { DirectoryTreeProps } from "antd/es/tree";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchDiagrams } from "@/loader/diagram.loader";
import { IDiagram } from "@/models/diagram";
import { UserState } from "@/store/auth/atom";

import styles from "../scss/organ.module.scss";
import { getNodeFromTree } from "../utils/utils";
import { CreateOrganizationModal } from "./CreateOrganizationModal";
import { DeleteOrganizationModal } from "./DeleteOrganizationModal";
import { UpdateOrganizationModal } from "./UpdateOrganizationModal";

export default function OrganizationTable(): JSX.Element {
  const { t } = useTranslation("translation");
  const userProfile = useRecoilValue(UserState);
  const [node, setNode] = useState<IDiagram>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchContent, setSearchContent] = useState<string>(
    searchParams.get("k") || "",
  );
  const diagramsQuery = useSearchDiagrams({
    params: {
      search_content: isEmpty(searchContent) ? null : searchContent,
      user_id: userProfile.user_id,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          diagramsQuery.refetch();
        }
      },
    },
  });

  useEffect(() => {
    return () => diagramsQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagramsQuery.remove]);

  const handleSearch = (value: string) => {
    searchParams.set("k", value);
    setSearchParams(searchParams);

    setSearchContent(value);
  };

  const handleSelectNode: DirectoryTreeProps["onSelect"] = (keys) => {
    setNode(
      getNodeFromTree(diagramsQuery?.data?.data?.data, keys[0].toString()),
    );
  };

  return (
    <>
      <Row
        className={styles.head_manager_wrap}
        style={{ padding: 0, paddingBottom: 12 }}
        justify={"space-between"}
      >
        <Col span={24}>
          <Input.Search
            onSearch={handleSearch}
            placeholder={t("organization.search_placeholder") || ""}
            defaultValue={searchContent}
          />
        </Col>
        <Col span={2} style={{ paddingTop: 12 }}>
          {/* <Typography.Title level={5} style={{ margin: 0 }} ellipsis>
            {t("authorization.functions.title_function")}
          </Typography.Title> */}
        </Col>
        <Col span={22} style={{ paddingTop: 12 }}>
          <Button.Group style={{ width: "100%", justifyContent: "flex-end" }}>
            <CreateOrganizationModal
              node={node}
              tree={diagramsQuery?.data?.data?.data}
            />
            <UpdateOrganizationModal
              node={node}
              tree={diagramsQuery?.data?.data?.data}
            />
            <DeleteOrganizationModal node={node} />
          </Button.Group>
        </Col>
      </Row>
      <Tree.DirectoryTree
        defaultExpandAll
        className={styles.tree}
        height={600}
        onSelect={handleSelectNode}
        treeData={diagramsQuery?.data?.data?.data}
      />
    </>
  );
}
