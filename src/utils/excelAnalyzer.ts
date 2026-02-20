// utils/excelAnalyzer.ts
import * as XLSX from 'xlsx';

export interface ProjectItem {
  rowNum: number;
  name: string;
  orderCode: string;
  orderName: string;
  hours: number;
  total: number;
}

export interface ExtractedData {
  sheetName: string;
  targetMonth: string;
  monthColumn: number;
  items: ProjectItem[];
  totalHours: number;
  uniqueNames: string[];
}

export interface AnalyzeParams {
  file: File;
  period: string;
  half: string; // "1" or "2"
  month: string; // "10", "11" etc
  name: string;
}

// xlsxライブラリのセル値の型
type CellValue = string | number | boolean | null | undefined;

export class ExcelAnalyzer {
  /**
   * Excelファイルを解析して案件を抽出
   */
  static async analyze(params: AnalyzeParams): Promise<ExtractedData> {
    const { file, period, half, month, name } = params;

    // ファイル読み込み
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });

    // シート名を構築
    const sheetName = `原価DATA(${period}期${half === '1' ? '上' : '下'})`;

    // シートの存在確認
    if (!workbook.SheetNames.includes(sheetName)) {
      throw new Error(
        `シート '${sheetName}' が見つかりません。\n利用可能なシート: ${workbook.SheetNames.join(', ')}`
      );
    }

    const worksheet = workbook.Sheets[sheetName];

    // JSON配列に変換
    const jsonData: CellValue[][] = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: null,
      raw: false,
    });

    if (jsonData.length < 3) {
      throw new Error('シートのデータが不足しています');
    }

    // ヘッダー行は2行目（インデックス1）
    const headerRowIdx = 1;
    const headers = jsonData[headerRowIdx];

    // 月列を探す
    const targetMonth = `${month}月`;
    const monthColIdx = headers.findIndex(
      (h: CellValue) => h && h.toString().trim() === targetMonth
    );

    if (monthColIdx === -1) {
      const availableMonths = headers
        .map((h: CellValue) => (h && h.toString().includes('月') ? `${h}` : null))
        .filter(Boolean);

      throw new Error(
        `'${targetMonth}' 列が見つかりません。\nヘッダーに存在する月: ${availableMonths.join(', ') || '（なし）'}`
      );
    }

    // データ行を検索（3行目から = インデックス2から）
    const matchedRows: ProjectItem[] = [];
    const matchedNames = new Set<string>();

    for (let i = 2; i < jsonData.length; i++) {
      const row = jsonData[i];
      const nameCell = row[0]; // A列

      // 名前が空または「合計」の場合はスキップ
      if (!nameCell || nameCell.toString().includes('合計')) {
        continue;
      }

      // 部分一致検索
      if (nameCell.toString().includes(name)) {
        matchedNames.add(nameCell.toString());

        const hours = row[monthColIdx];

        // 工数をパース（カンマ除去、スペース除去）
        let parsedHours = 0;
        if (hours) {
          const cleanedHours = hours.toString().replace(/,/g, '').replace(/\s/g, '');
          parsedHours = parseFloat(cleanedHours) || 0;
        }

        // 合計（J列 = インデックス9）
        const total = row[9];
        let parsedTotal = 0;
        if (total) {
          const cleanedTotal = total.toString().replace(/,/g, '').replace(/\s/g, '');
          parsedTotal = parseFloat(cleanedTotal) || 0;
        }

        matchedRows.push({
          rowNum: i + 1,
          name: nameCell.toString(),
          orderCode: row[1]?.toString() || '', // B列
          orderName: row[2]?.toString() || '', // C列
          hours: parsedHours,
          total: parsedTotal,
        });
      }
    }

    // 名前が見つからない場合
    if (matchedRows.length === 0) {
      throw new Error(`'${name}' を含む行が見つかりませんでした`);
    }

    // 合計工数を計算
    const totalHours = matchedRows.reduce((sum, row) => sum + row.hours, 0);

    return {
      sheetName,
      targetMonth,
      monthColumn: monthColIdx,
      items: matchedRows,
      totalHours,
      uniqueNames: Array.from(matchedNames),
    };
  }
}