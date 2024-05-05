import {
  Snackbar,
  Alert, AlertTitle,
} from "@mui/material";
import { useStateContext } from "../utils/StateContext";

function Message(): JSX.Element {
  const {
    messageOpen,
    setMessageOpen,
    messageText,
    messageSeverity,
  } = useStateContext();

  return (
    <Snackbar
      message={messageText}
      open={messageOpen}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={
        (messageSeverity !== "success")
          ? null
          : 6000
      }
      onClose={() => setMessageOpen(false)}
    >
      <Alert
        severity={messageSeverity}
        onClose={() => setMessageOpen(false)}
      >
        <AlertTitle>
          {messageSeverity.toUpperCase()}
        </AlertTitle>
        {messageText}
      </Alert>
    </Snackbar>
  );
}

export default Message;
