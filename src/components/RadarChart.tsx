import Chart from "react-apexcharts";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StatsList } from "../utils/Config";

type RadarChartProps = {
  data: StatsList;
}

function RadarChart({
  data
}: RadarChartProps): JSX.Element {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const statsOrder: (keyof StatsList)[] = ["h", "a", "b", "s", "d", "c"];

  const series = [
    {
      name: "種族値",
      data: statsOrder.map((key) => data[key])
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false
      },
    },
    theme: {
      mode: prefersDarkMode ? "dark" : "light" as "dark" | "light",
    },
    xaxis: {
      categories: ["HP", "こうげき", "ぼうぎょ", "すばやさ", "とくぼう", "とくこう"]
    },
    yaxis: {
      max: 200,
      min: 0,
      show: false
    },
    fill: {
      opacity: 0.8
    }
  };

  return (
    <Chart series={series} options={options} type="radar" />
  );
}

export default RadarChart;
