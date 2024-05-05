import { useState, useMemo } from "react";
import {
  Container, Grid,
  Typography,
  Stack, Slider,
  Card, CardActionArea, CardMedia
} from "@mui/material";
import {
  Grid3x3 as Grid3x3Icon,
  Grid4x4 as Grid4x4Icon
} from "@mui/icons-material";
import { dexRange } from "../utils/Config";
import DexDialog from "../components/DexDialog";

function Main(): JSX.Element {
  // 表示する列数
  const [listRowNum, setListRowNum] = useState<number>(10);
  // ダイアログを表示するか
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  // カードをクリックしたポケモンの図鑑番号
  const [dexNum, setDexNum] = useState<number>(0);

  // カードをクリックしたとき
  const handleCardClick = (dexNum: number) => {
    setDexNum(dexNum);
    setIsDialogOpen(true);
  };

  // 図鑑を表示
  const dexList = useMemo(() => {
    const dexList = [];
    for (let i = 1; i <= dexRange; i++) {
      // ポケモンの画像URL
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
      dexList.push(
        <Grid item key={i} xs={1}>
          <Card>
            <CardActionArea onClick={() => handleCardClick(i)}>
              <CardMedia component="img" image={imageUrl} alt={`${i}`} />
            </CardActionArea>
          </Card>
        </Grid>
      );
    }

    return dexList;
  }, []);

  const marks = [
    {
      value: 4,
      label: "4",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 15,
      label: "15",
    },
    {
      value: 20,
      label: "20",
    },
  ];

  return (
    <div>
      <Container maxWidth="xl"
        sx={{ mt: 2 }}
      >
        <Grid container
          spacing={1}
          sx={{
            mt: 2,
            alignItems: "end"
          }}
        >
          <Grid item xs={8}>
            <Typography variant="h4">
              {"ポケモン図鑑"}
            </Typography>
          </Grid>

          <Grid item xs={4}
            sx={{
              textAlign: "end"
            }}
          >
            <Typography>
              {dexRange}匹
            </Typography>
          </Grid>
        </Grid>

        <Grid container
          spacing={1}
          sx={{
            mt: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <Grid item xs={12}>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
            >
              <Grid3x3Icon />
              <Slider
                value={listRowNum}
                onChange={(event, value) => event && setListRowNum(value as number)}
                valueLabelDisplay="auto"
                marks={marks}
                step={null}
                min={4}
                max={20}
              />
              <Grid4x4Icon />
            </Stack>
          </Grid>
        </Grid>

        <Grid container
          spacing={0.2}
          columns={listRowNum}
          sx={{ mt: 4 }}
        >
          {dexList}
        </Grid>
      </Container>

      <DexDialog
        dexNum={dexNum}
        setDexNum={setDexNum}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default Main;
