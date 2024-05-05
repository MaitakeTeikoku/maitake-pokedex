import { useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { jaJP } from '@mui/material/locale';
import CssBaseline from "@mui/material/CssBaseline";
import { StateProvider } from "./utils/StateContext";
import Main from './pages/Main';
import Message from "./components/Message";
import Running from "./components/Running";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
          },
        },
        jaJP
      ),
    [prefersDarkMode],
  );


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StateProvider>
        <Main />
        <Message />
        <Running />
      </StateProvider>
    </ThemeProvider>
  );
}

export default App;
