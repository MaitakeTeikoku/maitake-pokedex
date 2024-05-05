import React, { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Tooltip,
  Dialog, DialogContent, DialogActions,
  Typography,
  Card, CardMedia,
  FormControl, Select, MenuItem,
  IconButton,
  DialogTitle
} from "@mui/material";
import {
  CatchingPokemon as CatchingPokemonIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { useStateContext } from "../utils/StateContext";
import { StatsList, Chart, dexRange, imageList, typeNameList, languageList } from "../utils/Config";
import ImageToggleButton from "./ImageToggleButton";
import ChartToggleButton from "./ChartToggleButton";
import RadarChart from "./RadarChart";
import BarChart from "./BarChart";
import Running from "./Running";

type DexDialogProps = {
  dexNum: number;
  setDexNum: React.Dispatch<React.SetStateAction<number>>;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DexDialog({
  dexNum,
  setDexNum,
  isDialogOpen,
  setIsDialogOpen
}: DexDialogProps): JSX.Element {
  const {
    createMessage,
    setIsRunning
  } = useStateContext();

  // ダイアログに表示するポケモンの名前
  const [name, setName] = useState<string>("");
  // 表示する画像
  const [imageNumber, setImageNumber] = useState<number>(0);
  // ダイアログに表示するポケモンを色違いにするか
  const [isShiny, setIsShiny] = useState<boolean>(false);
  // 言語設定
  const [languageCode, setLanguageCode] = useState<string>("ja");
  // ダイアログに表示するポケモンのタイプ番号のリスト
  const [typeList, setTypeList] = useState<number[]>([]);
  // ダイアログに表示するポケモンの属
  const [genera, setGenera] = useState<string>("");
  // 高さ
  const [height, setHeight] = useState<number>(0);
  // 重さ
  const [weight, setWeight] = useState<number>(0);
  // 伝説かどうか
  const [isLegendary, setIsLegendary] = useState<boolean>(false);
  // 幻かどうか
  const [isMythical, setIsMythical] = useState<boolean>(false);
  // ダイアログに表示するポケモンのフレーバーテキスト
  const [flavorText, setFlavorText] = useState<string>("");
  // ダイアログに表示するポケモンの種族値のリスト
  const [statsList, setStatsList] = useState<StatsList>({ h: 0, a: 0, b: 0, c: 0, d: 0, s: 0 });
  // グラフの種類
  const [chart, setChart] = useState<Chart>("bar");

  // ダイアログに表示するポケモンの図鑑番号が変更されたとき
  useEffect(() => {
    (async () => {
      if (dexNum <= 0) {
        return;
      }

      try {
        setIsRunning(true);

        // PokeAPIのpokemon-speciesからデータを取得
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexNum}`);
        if (!speciesResponse.ok) {
          throw new Error("ポケモンの名前取得失敗。");
        }
        const speciesData = await speciesResponse.json();

        // 選択した言語でのポケモン名を取得
        const languageName = speciesData.names.find((entry: any) => entry.language.name === languageCode);
        setName(languageName.name);

        // 選択した言語でのフレーバーテキストだけに絞り込む
        const languageEntries = speciesData.flavor_text_entries.filter((entry: any) => entry.language.name === languageCode);
        // ランダムに1つ選ぶ
        const randomLanguageEntry = languageEntries[Math.floor(Math.random() * languageEntries.length)];
        // ランダムに選ばれたフレーバーテキストを取得
        const randomFlavorText = randomLanguageEntry?.flavor_text;
        // 「\n」「\f」を変換
        const convertedText = randomFlavorText
          ? randomFlavorText.split(/[\n\f]/).map((line: string, index: number) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))
          : randomFlavorText;
        setFlavorText(convertedText);

        // 属を取得
        const languageGenera = speciesData.genera.find((entry: any) => entry.language.name === languageCode);
        setGenera(languageGenera?.genus);

        // 伝説
        const newLegendary = speciesData.is_legendary;
        setIsLegendary(newLegendary);

        // 幻
        const newMythical = speciesData.is_mythical;
        setIsMythical(newMythical);

        // PokeAPIのpokemonからデータを取得
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNum}`);
        if (!response.ok) {
          throw new Error("ポケモンの取得失敗。");
        }
        const data = await response.json();

        // タイプの名前を取得
        const typeIdList: number[] = data.types.map((entry: any) => {
          const typeName = entry.type.name;
          const type = typeNameList.find(type => type.name === typeName);
          return type ? type.id : null;
        }).filter((id: number | null) => id !== null) as number[];
        setTypeList(typeIdList);

        // 種族値を取得
        const newStatsList: StatsList = {
          h: data.stats.find((stat: any) => stat.stat.name === "hp")?.base_stat ?? 0,
          a: data.stats.find((stat: any) => stat.stat.name === "attack")?.base_stat ?? 0,
          b: data.stats.find((stat: any) => stat.stat.name === "defense")?.base_stat ?? 0,
          c: data.stats.find((stat: any) => stat.stat.name === "special-attack")?.base_stat ?? 0,
          d: data.stats.find((stat: any) => stat.stat.name === "special-defense")?.base_stat ?? 0,
          s: data.stats.find((stat: any) => stat.stat.name === "speed")?.base_stat ?? 0
        }
        setStatsList(newStatsList);

        // 高さ
        const newHeight = data.height / 10;
        setHeight(newHeight);

        // 重さ
        const newWeight = data.weight / 10;
        setWeight(newWeight);
      } catch (error: unknown) {
        if (error instanceof Error) {
          createMessage(`${error.message}`, "error");
        } else {
          createMessage("予期しないエラー", "error");
        }
      } finally {
        setIsRunning(false);
      }
    })()
    // eslint-disable-next-line
  }, [dexNum, languageCode]);

  // ダイアログに表示するポケモンの画像URL
  const imageUrl = useMemo(() => {
    const url = imageList[imageNumber].url;
    const shiny = isShiny ? "/shiny" : "";
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${url}${shiny}/${dexNum}.png`;
  }, [imageNumber, isShiny, dexNum]);

  // 合計種族値
  const totalStats = useMemo(() => {
    return Object.values(statsList).reduce((a, b) => a + b, 0);
  }, [statsList]);

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
    >
      <DialogTitle>
        {name}
      </DialogTitle>
      <DialogContent>
        <Grid container
          spacing={1}
        >
          <Grid item xs={12} md={6}>
            <Grid container
              spacing={1}
              sx={{
                alignItems: "center"
              }}
            >
              <Grid item xs={4}>
                <Typography variant="h6">
                  {`No.${dexNum}`}
                </Typography>
              </Grid>
              <Grid item xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                {(isMythical || isLegendary) && (
                  <Tooltip arrow
                    title={isMythical
                      ? "幻"
                      : isLegendary
                        ? "伝説"
                        : ""}
                  >
                    <CatchingPokemonIcon
                      color={
                        isMythical
                          ? "error"
                          : isLegendary
                            ? "inherit"
                            : "disabled"
                      }
                    />
                  </Tooltip>
                )}
              </Grid>
              {typeList.map((type, index) => (
                <Grid item key={index} xs={2}>
                  <Tooltip arrow
                    title={`${typeNameList.find(typeName => typeName.id === type)?.nameJp}`}
                  >
                    <CardMedia
                      component="img"
                      image={`${process.env.PUBLIC_URL}/img/icon_type/icon_type_${type}.svg`}
                      alt={`${type}`}
                    />
                  </Tooltip>
                </Grid>
              ))}

              <Grid item xs={12}>
                <ImageToggleButton
                  imageNumber={imageNumber}
                  setImageNumber={setImageNumber}
                  isShiny={isShiny}
                  setIsShiny={setIsShiny}
                />
              </Grid>
            </Grid>

            <Card>
              <Tooltip arrow
                title={`${name}`}
              >
                <CardMedia
                  component="img"
                  image={imageUrl}
                  alt={`${dexNum}`}
                />
              </Tooltip>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container
              spacing={1}
              alignItems="center"
            >
              <Grid item xs={3}>
                <Typography>
                  {"種族値"}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>
                  {`${totalStats}`}
                </Typography>
              </Grid>
              <Grid item xs={6}
                sx={{ textAlign: "end" }}
              >
                <ChartToggleButton
                  chart={chart}
                  setChart={setChart}
                />
              </Grid>
            </Grid>

            {chart === "bar" && (
              <BarChart
                data={statsList}
              />
            )}

            {chart === "radar" && (
              <RadarChart
                data={statsList}
              />
            )}

            <Grid container
              spacing={1}
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography>
                  {`高さ: ${height.toFixed(1)} m`}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {`重さ: ${weight.toFixed(1)} kg`}
                </Typography>
              </Grid>

              <Grid item xs={8}>
                <FormControl>
                  <Select
                    value={languageCode}
                    onChange={(event) => setLanguageCode(event.target.value)}
                  >
                    {languageList.map((language, index) => (
                      <MenuItem
                        key={index}
                        value={language.code}
                      >
                        {language.display}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={9}>
                <Typography>
                  {genera}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption">
                  {flavorText}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Tooltip arrow
          title="戻る"
        >
          <IconButton
            onClick={() => setDexNum(dexNum - 1)}
            disabled={dexNum <= 1}
            color="primary"
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>

        <Tooltip arrow
          title="閉じる"
        >
          <IconButton
            onClick={() => setIsDialogOpen(false)}
            color="inherit"
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>

        <Tooltip arrow
          title="進む"
        >
          <IconButton
            onClick={() => setDexNum(dexNum + 1)}
            disabled={dexNum >= dexRange}
            color="primary"
          >
            <ArrowForwardIcon />
          </IconButton>
        </Tooltip>
      </DialogActions>

      <Running />
    </Dialog>
  );
};

export default DexDialog;
