import { Button, Col, Input, Row, Tree, Typography } from "antd";
import { DirectoryTreeProps } from "antd/es/tree";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchFunctions } from "@/loader/function.loader";
import { functionState } from "@/modules/authorization/store/atom";
import { UserState } from "@/store/auth/atom";

import styles from "../../../../scss/styles.module.scss";
import { CreateFunctionModal } from "./CreateFunctionModal";
import { DeleteFunctionModal } from "./DeleteFunctionModal";
import { UpdateFunctionModal } from "./UpdateFunctionModal";

export default function FunctionTable(): JSX.Element {
  const setFunction = useSetRecoilState(functionState);
  const [contentSearch, setContentSearch] = useState("");
  const userRecoil = useRecoilValue(UserState);

  const { data, refetch } = useSearchFunctions({
    params: {
      search_content: isEmpty(contentSearch) ? null : contentSearch,
      user_id: userRecoil.user_id,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          refetch();
        }
      },
    },
  });

  useEffect(() => setFunction(""), [setFunction]);

  const { t } = useTranslation();

  const onSelect: DirectoryTreeProps["onSelect"] = (keys) => {
    setFunction(keys[0].toString());
  };

  const handleSearch = (value: string) => {
    setContentSearch(value);
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
            placeholder={t("authorization.functions.search_placeholder") || ""}
          />
        </Col>
        <Col span={12} style={{ paddingTop: 12 }}>
          <Typography.Title level={5} style={{ margin: 0 }} ellipsis>
            {t("authorization.functions.title_function")}
          </Typography.Title>
        </Col>
        <Col span={12} style={{ paddingTop: 12 }}>
          <Button.Group style={{ width: "100%", justifyContent: "flex-end" }}>
            <CreateFunctionModal />
            <UpdateFunctionModal />
            <DeleteFunctionModal tree={data?.data} />
          </Button.Group>
        </Col>
      </Row>
      <Tree.DirectoryTree
        defaultExpandAll
        className={styles.tree}
        height={600}
        onSelect={onSelect}
        treeData={data?.data}
      />
    </>
  );
}
