import { TinyColumn, TinyColumnConfig } from "@ant-design/plots";

interface Props {
  data: number[];
  loading?: boolean;
}

export default function TinyColumnCustom({
  data,
  loading = false,
}: Props): JSX.Element {
  const config: TinyColumnConfig = {
    data,
    loading,
  };

  return <TinyColumn {...config} />;
}
