import {
  Tooltip,
  ToggleButtonGroup, ToggleButton
} from "@mui/material";
import { Chart, chartList } from "../utils/Config";

interface ChartToggleButtonProps {
  chart: Chart;
  setChart: React.Dispatch<React.SetStateAction<Chart>>;
}

function ChartToggleButton({
  chart,
  setChart
}: ChartToggleButtonProps): JSX.Element {
  const handleChart = (
    event: React.MouseEvent<HTMLElement>,
    newChart: Chart | null,
  ) => {
    if (newChart !== null) {
      setChart(newChart);
    }
  };

  return (
    <ToggleButtonGroup
      value={chart}
      exclusive
      onChange={handleChart}
      size="small"
      color="primary"
    >
      {chartList.map((chart) => (
        <Tooltip arrow
          key={chart.id}
          title={chart.name}
        >
          <ToggleButton
            value={chart.id}
          >
            {chart.icon}
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}

export default ChartToggleButton;
