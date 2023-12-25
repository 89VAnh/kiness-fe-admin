import { useMutation } from "react-query";

import { MutationConfig } from "@/lib/react-query";
import { sendMailNewPw } from "@/services/email.service";

const useMailNewPw = ({
  config,
}: {
  config?: MutationConfig<typeof sendMailNewPw>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: sendMailNewPw,
  });
};

export { useMailNewPw };
