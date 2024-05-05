
import {
  Image as ImageIcon,
  Home as HomeIcon,
  CallMade as CallMadeIcon,
  CallReceived as CallReceivedIcon
} from "@mui/icons-material";

// 表示するポケモンの数
export const dexRange = 1025;

// 表示する画像の種類
export const imageList = [
  {
    url: "/other/official-artwork",
    icon: <ImageIcon />
  },
  {
    url: "",
    icon: <CallReceivedIcon />
  },
  {
    url: "/back",
    icon: <CallMadeIcon />
  },
  {
    url: "/other/home",
    icon: <HomeIcon />
  }

];

// タイプ名の情報
export const typeNameList: { id: number, name: string }[] = [
  { id: 1, name: "normal" },
  { id: 2, name: "fire" },
  { id: 3, name: "water" },
  { id: 4, name: "grass" },
  { id: 5, name: "electric" },
  { id: 6, name: "ice" },
  { id: 7, name: "fighting" },
  { id: 8, name: "poison" },
  { id: 9, name: "ground" },
  { id: 10, name: "flying" },
  { id: 11, name: "psychic" },
  { id: 12, name: "bug" },
  { id: 13, name: "rock" },
  { id: 14, name: "ghost" },
  { id: 15, name: "dragon" },
  { id: 16, name: "dark" },
  { id: 17, name: "steel" },
  { id: 18, name: "fairy" }
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
