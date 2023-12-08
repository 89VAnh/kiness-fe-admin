import { Button, message } from "antd";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

import {
  CACHE_EXPERIENCE_REGISTER,
  useUpdateExperienceRegisterStatus,
} from "@/loader/experience-register.loader";
import { UserState } from "@/store/auth/atom";

interface Props {
  id: number;
  status: number;
}

export default function ExperienceRegisterConfirm({
  id,
  status,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "experience_register",
  });
  const userProfile = useRecoilValue(UserState);
  const queryClient = useQueryClient();

  const updateExperienceRegisterStatus = useUpdateExperienceRegisterStatus({
    config: {
      onSuccess: (data) => {
        if (data.results) {
          message.success(t("messages.update_status_success"));
          queryClient.invalidateQueries([CACHE_EXPERIENCE_REGISTER.SEARCH]);
        } else message.error(data.message);
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const handleUpdateStatus = (status: number) => {
    updateExperienceRegisterStatus.mutate({
      register_id: id,
      status: status,
      lu_user_id: userProfile.user_id,
    });
  };

  const ChangeStatusBtn = () => {
    switch (status) {
      case 0:
        return (
          <Button type="primary" onClick={() => handleUpdateStatus(1)}>
            {t("btn.btn_confirm")}
          </Button>
        );
      case 1:
        return (
          <Button danger onClick={() => handleUpdateStatus(0)}>
            {t("btn.btn_cancel_confirm")}
          </Button>
        );
      default:
        return <Button>Test</Button>;
    }
  };

  return <ChangeStatusBtn />;
}
