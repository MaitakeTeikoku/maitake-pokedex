import React, { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Dialog, DialogContent, DialogActions,
  Typography,
  Card, CardMedia,
  FormControl, Select, MenuItem,
  IconButton,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { useStateContext } from "../utils/StateContext";
import { imageList, typeNameList, languageList, dexRange } from "../utils/Config";
import ImageToggleButton from "./ImageToggleButton";
import RadarChart from "./RadarChart";
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
  // ダイアログに表示するポケモンのタイプ番号のリスト
  const [typeList, setTypeList] = useState<number[]>([]);
  // ダイアログに表示するポケモンのフレーバーテキスト
  const [flavorText, setFlavorText] = useState<string>("");
  // ダイアログに表示するポケモンの属
  const [genera, setGenera] = useState<string>("");
  // ダイアログに表示するポケモンの種族値のリスト
  const [statsList, setStatsList] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  // ダイアログに表示するポケモンを色違いにするか
  const [isShiny, setIsShiny] = useState<boolean>(false);
  // 言語設定
  const [languageCode, setLanguageCode] = useState<string>("ja");
  // 表示する画像
  const [imageNumber, setImageNumber] = useState<number>(0);

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
        const statNamesOrder = ["hp", "attack", "defense", "speed", "special-defense", "special-attack"];
        const statsList: number[] = statNamesOrder.map((statName) => {
          const statData = data.stats.find((stat: any) => stat.stat.name === statName);
          return statData ? statData.base_stat : 0;
        });
        setStatsList(statsList);

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

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
    >
      <DialogContent>
        <Grid container
          spacing={1}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Grid item xs={12}
            sx={{ mt: 1 }}
          >
            <Typography variant="h5">{name}</Typography>
          </Grid>

          <Grid item xs={12}
            sx={{ mt: 1 }}
          >
            <ImageToggleButton
              imageNumber={imageNumber}
              setImageNumber={setImageNumber}
              isShiny={isShiny}
              setIsShiny={setIsShiny}
            />
          </Grid>
        </Grid>

        <Card>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={`${dexNum}`}
          />
        </Card>

        <Grid container
          spacing={1}
          alignItems="center"
          sx={{ mt: 1 }}
        >
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

          {typeList.map((type, index) => (
            <Grid item key={index} xs={2}>
              <CardMedia
                component="img"
                image={`${process.env.PUBLIC_URL}/img/icon_type/icon_type_${type}.svg`}
                alt={`${type}`}
              />
            </Grid>
          ))}

          <Grid item xs={3}>
            <Typography variant="subtitle1">No.{dexNum}</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1">{genera}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">
              {flavorText}
            </Typography>
          </Grid>
        </Grid>

        <RadarChart
          data={statsList}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between" }}>
        <IconButton
          onClick={() => setDexNum(dexNum - 1)}
          disabled={dexNum <= 1}
          color="primary"
        >
          <ArrowBackIcon />
        </IconButton>

        <IconButton
          onClick={() => setIsDialogOpen(false)}
          color="inherit"
        >
          <CloseIcon />
        </IconButton>

        <IconButton
          onClick={() => setDexNum(dexNum + 1)}
          disabled={dexNum >= dexRange}
          color="primary"
        >
          <ArrowForwardIcon />
        </IconButton>
      </DialogActions>

      <Running />
    </Dialog>
  );
};

export default DexDialog;
