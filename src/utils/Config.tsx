
import {
  Image as ImageIcon,
  Home as HomeIcon,
  CallMade as CallMadeIcon,
  CallReceived as CallReceivedIcon,
  BarChart as BarChartIcon,
  Hexagon as HexagonIcon
} from "@mui/icons-material";

export type StatsList = {
  h: number,
  a: number,
  b: number,
  c: number,
  d: number,
  s: number,
}
export type Chart = "bar" | "radar";

// 表示するポケモンの数
export const dexRange = Number(process.env.REACT_APP_DEX_RANGE);

// 表示する画像の種類
export const imageList = [
  {
    name: "公式イラスト",
    url: "/other/official-artwork",
    icon: <ImageIcon />
  },
  {
    name: "正面",
    url: "",
    icon: <CallReceivedIcon />
  },
  {
    name: "背面",
    url: "/back",
    icon: <CallMadeIcon />
  },
  {
    name: "ポケモンホーム",
    url: "/other/home",
    icon: <HomeIcon />
  }
];

// グラフの種類
export const chartList: { id: Chart, name: string, icon: JSX.Element }[] = [
  {
    id: "bar",
    name: "棒グラフ",
    icon: <BarChartIcon />
  },
  {
    id: "radar",
    name: "レーダーチャート",
    icon: <HexagonIcon />
  }
];

// タイプ名の情報
export const typeNameList: { id: number, name: string, nameJp: string }[] = [
  { id: 1, name: "normal", nameJp: "ノーマル" },
  { id: 2, name: "fire", nameJp: "ほのお" },
  { id: 3, name: "water", nameJp: "みず" },
  { id: 4, name: "grass", nameJp: "くさ" },
  { id: 5, name: "electric", nameJp: "でんき" },
  { id: 6, name: "ice", nameJp: "こおり" },
  { id: 7, name: "fighting", nameJp: "かくとう" },
  { id: 8, name: "poison", nameJp: "どく" },
  { id: 9, name: "ground", nameJp: "じめん" },
  { id: 10, name: "flying", nameJp: "ひこう" },
  { id: 11, name: "psychic", nameJp: "エスパー" },
  { id: 12, name: "bug", nameJp: "むし" },
  { id: 13, name: "rock", nameJp: "いわ" },
  { id: 14, name: "ghost", nameJp: "ゴースト" },
  { id: 15, name: "dragon", nameJp: "ドラゴン" },
  { id: 16, name: "dark", nameJp: "あく" },
  { id: 17, name: "steel", nameJp: "はがね" },
  { id: 18, name: "fairy", nameJp: "フェアリー" }
];

// 言語
export const languageList: { code: string; display: string }[] = [
  { code: "ja", display: "日本語" },
  { code: "ja-Hrkt", display: "にほんご" },
  { code: "en", display: "English" },
  { code: "ko", display: "한국어" },
  { code: "fr", display: "français" },
  { code: "de", display: "Deutsch" },
  { code: "es", display: "español" },
  { code: "it", display: "Italiano" },
  { code: "zh-Hant", display: "繁體" },
  { code: "zh-Hans", display: "简体" },
];
