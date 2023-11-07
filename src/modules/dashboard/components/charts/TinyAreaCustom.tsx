import { TinyArea, TinyAreaConfig } from "@ant-design/plots";

interface Props {
  data: number[];
  loading?: boolean;
}

export default function TinyAreaCustom({
  data,
  loading = false,
}: Props): JSX.Element {
  const config: TinyAreaConfig = {
    data,
    loading,
    smooth: true,
    line: {
      color: "#b086eb",
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#cdb2f2 1:#b086eb",
      };
    },
  };

  return <TinyArea {...config} />;
}
