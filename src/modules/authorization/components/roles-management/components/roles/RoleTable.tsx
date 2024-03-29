import { WarningFilled } from "@ant-design/icons";
import {
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tree,
  Typography,
  notification,
} from "antd";
import { DirectoryTreeProps } from "antd/es/tree";
import _, { isEmpty } from "lodash";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

import { ERROR_TIMEOUT } from "@/constant/config";
import { useSearchFunctions } from "@/loader/function.loader";
import { useCreatePerFuncForRole } from "@/loader/role-function.loader";
import { useSearchRoles } from "@/loader/role.loader";
import { IRole } from "@/models/role";
import {
  changedActionState,
  functionRoleState,
  roleState,
} from "@/modules/authorization/store/atom";
import { getFunctionByRole } from "@/services/function.service";
import { UserState } from "@/store/auth/atom";

import styles from "../../../../scss/styles.module.scss";
import {
  checkIfNotEnoughLeafs,
  filterNot,
  flattenTree,
} from "../../utils/array";
import { DetailRoleModal } from "./DetailRoleModal";
import { RoleModal } from "./RoleModal";

const Confirm = Modal.confirm;

const configModal = {
  title: "Cảnh Báo!",
  content: "Bạn có muốn lưu thay đổi?",
  icon: <WarningFilled />,
};

export default function RoleTable({
  dataChecked,
  setDataChecked,
}: any): JSX.Element {
  const setFunction = useSetRecoilState(functionRoleState);
  const [roleId, setRoleId] = useRecoilState(roleState);
  const [searchParams, setSearchParams] = useSearchParams();
  const actionState = useRecoilValue<any>(changedActionState);
  const resetActionState = useResetRecoilState(changedActionState);
  const userRecoil = useRecoilValue(UserState);
  const { t } = useTranslation();

  // init search parameters
  const searchContent = searchParams.get("search_function") || "";

  // Get function tree
  const { data, refetch: refetchFunction } = useSearchFunctions({
    params: {
      search_content: isEmpty(searchContent) ? null : searchContent,
      user_id: userRecoil.user_id,
    },
    config: {
      onSuccess: (data) => {
        if (data.message === ERROR_TIMEOUT) {
          refetchFunction();
        }
      },
    },
  });

  // Get roles
  const { data: dataRoles, refetch: refetchRole } = useSearchRoles({
    params: {
      user_id: userRecoil.user_id,
    },
    config: {
      onSuccess: async (data) => {
        // Init role
        setRoleId(data?.data?.[0]?.role_id);
        if (data.message === ERROR_TIMEOUT) {
          refetchRole();
        }
      },
    },
  });

  useEffect(() => {
    if (roleId) {
      getFunctionByRole(roleId).then((role: any) => {
        const functions = role.map((i: any) => i.function_id) || [];
        const parentToRemove =
          checkIfNotEnoughLeafs(data?.data || [], functions) || [];
        const result = _.difference(functions, parentToRemove);
        setDataChecked(result);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId]);

  const createFuncPermissions = useCreatePerFuncForRole({
    config: {
      onSuccess: () => {
        notification.success({
          message: t("messages.save_success"),
          description: "Vui lòng đăng nhập lại nếu không thấy thay đổi",
        });
      },
      onError: () => {
        notification.error({
          message: t("messages.update_failure"),
        });
      },
    },
  });

  // Handle when selected function
  const onSelect: DirectoryTreeProps["onSelect"] = (keys) => {
    // Set function to selected
    if (actionState?.isChanged) {
      Confirm({
        ...configModal,
        onOk: () => {
          actionState.fn();
          resetActionState();
          if (keys.length > 0) setFunction(keys[0].toString());
          else setFunction("");
        },
        onCancel: () => {
          resetActionState();
          if (keys.length > 0) setFunction(keys[0].toString());
          else setFunction("");
        },
        okText: t("all.btn_save"),
        cancelText: t("all.btn_cancel"),
      });
    } else {
      if (keys.length > 0) setFunction(keys[0].toString());
      else setFunction("");
    }
  };

  // Handle when search function
  const handleSearch = (value: string) => {
    searchParams.set("search_function", value);
    setSearchParams(searchParams);
  };

  // Handle when selected role
  const handleSelectRole = (role_id: string) => {
    // Set role to selected
    setRoleId(role_id);
  };

  // Handle when checking
  const handleCheck = (checked: any, info: any) => {
    Confirm({
      ...configModal,
      onOk: () => {
        handleOk(checked, info.halfCheckedKeys);
        setDataChecked(checked);
      },
      okText: t("all.btn_save"),
      cancelText: t("all.btn_cancel"),
    });
  };

  // Handle save
  const handleOk = (checked: any, haftCheckedKeys: any[] = []) => {
    const role_function_list = [
      ...checked?.map((i: any) => ({
        role_function_id: "",
        function_id: i,
        role_id: roleId,
        active_flag: 1,
      })),
      ...filterNot(flattenTree(data?.data), checked, "key").map((i) => ({
        role_function_id: "",
        function_id: i.key,
        role_id: roleId,
        active_flag: 0,
      })),
    ];

    if (haftCheckedKeys.length > 0) {
      role_function_list.forEach((data) => {
        const haftIndex = haftCheckedKeys.findIndex(
          (key) => key === data.function_id,
        );
        if (haftIndex >= 0) data.active_flag = 1;
      });
    }

    const dataPost = {
      role_function_list,
      created_by_user_id: userRecoil.user_id || userRecoil.user_name,
    };
    createFuncPermissions.mutate(dataPost);
  };

  return (
    <>
      <Row
        className={styles.head_manager_wrap}
        style={{ padding: 0, paddingBottom: 12 }}
        justify={"space-between"}
      >
        <Col span={24} style={{ paddingTop: 9 }}>
          <Row
            align={"bottom"}
            justify={"space-between"}
            style={{ marginBottom: 10 }}
          >
            <Typography.Title level={5} style={{ marginBottom: 0 }}>
              {t("authorization.roles.dropdown_role_title")}
            </Typography.Title>
            <DetailRoleModal />
          </Row>
          <Select
            showSearch
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "hidden" }}
            placeholder={t("authorization.roles.dropdown_role_placeholder")}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <RoleModal isCreate={true} />
                </Space>
              </>
            )}
            options={dataRoles?.data?.map((role: IRole) => ({
              ...role,
              value: role.role_id,
              label: role.role_name,
            }))}
            onSelect={handleSelectRole}
            value={roleId}
          />
        </Col>

        <Col span={24} style={{ paddingTop: 10 }}>
          <Row
            align={"middle"}
            justify={"space-between"}
            style={{ marginBottom: 10 }}
          >
            <Typography.Title level={5} style={{ marginBottom: 0 }}>
              {t("authorization.functions.title_function")}
            </Typography.Title>
          </Row>
        </Col>

        <Col span={24}>
          <Input.Search
            onSearch={handleSearch}
            placeholder={t("authorization.functions.search_placeholder") || ""}
          />
        </Col>
      </Row>
      <Tree
        checkable
        expandAction="click"
        checkedKeys={dataChecked}
        onCheck={handleCheck}
        autoExpandParent
        className={styles.tree + " " + styles.tree_small}
        style={{ maxHeight: 600, overflow: "auto" }}
        onSelect={onSelect}
        treeData={data?.data}
      />
    </>
  );
}
