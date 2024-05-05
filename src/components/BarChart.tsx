import Chart from "react-apexcharts";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StatsList } from "../utils/Config";

type BarChartProps = {
  data: StatsList;
}

function BarChart({
  data
}: BarChartProps): JSX.Element {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const statsOrder: (keyof StatsList)[] = ["h", "a", "b", "c", "d", "s"];

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
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    xaxis: {
      categories: ["HP", "こうげき", "ぼうぎょ", "とくこう", "とくぼう", "すばやさ"],
      max: 250,
      min: 0
    },
    grid: {
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      }
    }
  };

  return (
    <Chart series={series} options={options} type="bar" />
  );
}

export default BarChart;
