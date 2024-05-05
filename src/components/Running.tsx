import {
  Backdrop, CircularProgress
} from "@mui/material";
import { useStateContext } from "../utils/StateContext";

function Running(): JSX.Element {
  const {
    isRunning
  } = useStateContext();

  return (
    <Backdrop
      open={isRunning}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Running;
