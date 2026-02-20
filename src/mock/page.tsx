// MockPage.tsx
import { useState, useMemo } from 'react';
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { InputExcelFile } from "../components/InputExcelFile";
import { HALF, getMonthsByHalf } from "../enums/months";

export default function MockPage() {
  const [half, setHalf] = useState('');
  const [month, setMonth] = useState('');
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
    console.log('送信データ:', { half, month, file: file?.name });
    alert(`半期: ${half}\n月: ${month}\nファイル: ${file?.name || 'なし'}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Mock Page</h1>
        
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
        
        <InputExcelFile 
          id="file-input"
          label="Excelファイル"
          onChange={setFile}
          onError={(error) => console.error(error)}
        />
        
        <Button 
          onClick={handleSubmit}
          fullWidth
          disabled={!half || !month || !file}
        >
          Submit
        </Button>

        {/* 選択内容の表示（デバッグ用） */}
        {(half || month || file) && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">選択内容</h3>
            <div className="text-sm text-blue-700 space-y-1">
              {half && <p><strong>半期:</strong> {HALF.find(h => h.value === half)?.label}</p>}
              {month && <p><strong>月:</strong> {monthOptions.find(m => m.value === month)?.label}</p>}
              {file && <p><strong>ファイル:</strong> {file.name}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}