import {
  Tooltip,
  AppBar, Toolbar,
  Typography, IconButton, Avatar
} from "@mui/material";
import { dexRange } from "../utils/Config";

function MainAppBar(): JSX.Element {
  return (
    <div>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Tooltip arrow
            title="ホームに戻る"
          >
            <IconButton
              onClick={() => window.location.href = "https://maitake-home.pages.dev"}
              sx={{ p: 0, mr: 2 }}
            >
              <Avatar
                alt="Maitake"
                src={`${process.env.PUBLIC_URL}/logo192.png`}
              />
            </IconButton>
          </Tooltip>

          <Typography variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {`ポケモン図鑑`}
          </Typography>

          <Typography>
            {`${dexRange}匹`}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MainAppBar;
