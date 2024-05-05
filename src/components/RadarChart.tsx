import Chart from "react-apexcharts";

type RadarChartProps = {
  data: number[];
}

function RadarChart({
  data
}: RadarChartProps): JSX.Element {
  const series = [
    {
      data: data,
    },
  ];

  const options = {
    chart: {
      id: "radar-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["HP", "こうげき", "ぼうぎょ", "すばやさ", "とくぼう", "とくこう"],
    },
    yaxis: {
      max: 255,
      min: 0,
      show: false,
    },
    fill: {
      opacity: 0.5,
    },
    markers: {
      size: 0,
    },
  };

  return (
    <div>
      <Chart series={series} options={options} type="radar" />
    </div>
  );
}

export default RadarChart;
