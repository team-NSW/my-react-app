// MockPage.tsx
import { useState, useMemo } from 'react';
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { InputExcelFile } from "../components/InputExcelFile";
import { Input } from '../components/Input';
import { HALF, getMonthsByHalf } from "../enums/months";

export default function MockPage() {
  const [period, setPeriod] = useState('');
  const [half, setHalf] = useState('');
  const [month, setMonth] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // 半期に応じた月の選択肢を取得
  const monthOptions = useMemo(() => {
    return getMonthsByHalf(half);
  }, [half]);

  // 半期が変更されたときの処理
  const handleHalfChange = (value: string) => {
    setHalf(value);
    setMonth(''); // 半期が変わったら月の選択をリセット
  };

  const handleSubmit = () => {
    alert(`期別: ${period}\n半期: ${half}\n月: ${month}\n名前: ${name}\nファイル: ${file?.name || 'なし'}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">📊 原価見込みExcel読み込み</h1>
        <Input type='number' id="period" label="期別" value={period} onChange={(e) => setPeriod(e.target.value)} required />
        <Select
          id="half-select"
          label="半期"
          value={half}
          onChange={handleHalfChange}
          options={HALF}
          placeholder="半期を選択"
          required
        />

        <Select
          id="month-select"
          label="月"
          value={month}
          onChange={setMonth}
          options={monthOptions}
          placeholder={half ? "月を選択" : "先に半期を選択してください"}
          disabled={!half}
          required
        />
        <Input id="name" label="名前を入力(部分一致)" value={name} onChange={(e) => setName(e.target.value)} required />

        <InputExcelFile
          id="file-input"
          label="Excelファイル"
          onChange={setFile}
          onError={(error) => console.error(error)}
          required
        />

        <Button
          onClick={handleSubmit}
          fullWidth
          disabled={!period || !half || !month || !name || !file}
        >
          Excel読み込み開始
        </Button>

        {/* 選択内容の表示（デバッグ用） */}
        {(half || month || file) && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">選択内容</h3>
            <div className="text-sm text-blue-700 space-y-1">
              {period && <p><strong>期別:</strong> {period}</p>}
              {half && <p><strong>半期:</strong> {HALF.find(h => h.value === half)?.label}</p>}
              {month && <p><strong>月:</strong> {monthOptions.find(m => m.value === month)?.label}</p>}
              {name && <p><strong>名前:</strong> {name}</p>}
              {file && <p><strong>ファイル:</strong> {file.name}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}