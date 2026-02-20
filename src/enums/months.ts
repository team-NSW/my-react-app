// enums/months.ts
import type { SelectOption } from "../components/Select";

export const HALF: SelectOption[] = [
  { value: "1", label: "上半期(4月〜9月)" },
  { value: "2", label: "下半期(10月〜3月)" },
];

export const MONTHS_FIRST_HALF: SelectOption[] = [
  { value: "4", label: "4月" },
  { value: "5", label: "5月" },
  { value: "6", label: "6月" },
  { value: "7", label: "7月" },
  { value: "8", label: "8月" },
  { value: "9", label: "9月" },
];

export const MONTHS_SECOND_HALF: SelectOption[] = [
  { value: "10", label: "10月" },
  { value: "11", label: "11月" },
  { value: "12", label: "12月" },
  { value: "1", label: "1月" },
  { value: "2", label: "2月" },
  { value: "3", label: "3月" },
];

export const ALL_MONTHS: SelectOption[] = [
  { value: "1", label: "1月" },
  { value: "2", label: "2月" },
  { value: "3", label: "3月" },
  { value: "4", label: "4月" },
  { value: "5", label: "5月" },
  { value: "6", label: "6月" },
  { value: "7", label: "7月" },
  { value: "8", label: "8月" },
  { value: "9", label: "9月" },
  { value: "10", label: "10月" },
  { value: "11", label: "11月" },
  { value: "12", label: "12月" },
];

// 半期の値から月の選択肢を取得する関数
export const getMonthsByHalf = (halfValue: string): SelectOption[] => {
  switch (halfValue) {
    case "1":
      return MONTHS_FIRST_HALF;
    case "2":
      return MONTHS_SECOND_HALF;
    default:
      return [];
  }
};